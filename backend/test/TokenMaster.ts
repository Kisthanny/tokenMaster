import { expect } from "chai";
import hre from "hardhat";
import { TokenMaster } from "../typechain-types";
import { ContractTransactionResponse } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { token } from "../typechain-types/@openzeppelin/contracts";

describe("TokenMaster", () => {
    const NAME = "Ticket Master";
    const SYMBOL = "TM";

    const OCCASION_NAME = "The Era's Tour";
    const OCCASION_COST = hre.ethers.parseEther("2");
    const OCCASION_MAX_TICKETS = 70000;
    const OCCASION_DATE = "Apr 28";
    const OCCASION_TIME = "10:00AM CST";
    const OCCASION_LOCATION = "SoFi, CA";

    let tokenMaster: TokenMaster & {
        deploymentTransaction(): ContractTransactionResponse
    }

    // signers
    let deployer: HardhatEthersSigner;
    let buyer: HardhatEthersSigner;

    beforeEach(async () => {
        [deployer, buyer] = await hre.ethers.getSigners()
        const TokenMaster = await hre.ethers.getContractFactory('TokenMaster');
        tokenMaster = await TokenMaster.connect(deployer).deploy(NAME, SYMBOL);

        const transaction = await tokenMaster.connect(deployer).list(OCCASION_NAME, OCCASION_COST, OCCASION_MAX_TICKETS, OCCASION_DATE, OCCASION_TIME, OCCASION_LOCATION);
        await transaction.wait()
    })
    describe("Deployment", () => {
        it("Sets the name", async () => {
            const name = await tokenMaster.name();
            expect(name).equal(NAME);
        })
        it("Sets the symbol", async () => {
            const symbol = await tokenMaster.symbol();
            expect(symbol).equal(SYMBOL);
        })
        it("Sets the owner", async () => {
            const owner = await tokenMaster.owner();
            expect(owner).equal(deployer.address);
        })
    })
    describe("Listing", () => {
        const OCCASION_ID = 1;
        it("Updates occasions count", async () => {
            const occasionCounter = await tokenMaster.occasionCounter();
            expect(occasionCounter).equal(OCCASION_ID)
        })

        it('Returns occasion attributes', async () => {
            const occasion = await tokenMaster.getOccasion(OCCASION_ID);
            const { id, name, cost, tickets, maxTickets, date, time, location } = occasion;
            expect(id).equal(OCCASION_ID);
            expect(name).equal(OCCASION_NAME);
            expect(cost).equal(OCCASION_COST);
            expect(tickets).equal(OCCASION_MAX_TICKETS);
            expect(maxTickets).equal(OCCASION_MAX_TICKETS);
            expect(date).equal(OCCASION_DATE);
            expect(time).equal(OCCASION_TIME);
            expect(location).equal(OCCASION_LOCATION);
        })
    })

    describe("Minting", () => {
        const OCCASION_ID = 1n;
        const SEAT = 50n;
        const AMOUNT = hre.ethers.parseEther("2");
        beforeEach(async () => {
            const transaction = await tokenMaster.connect(buyer).mint(OCCASION_ID, SEAT, { value: AMOUNT })
            await transaction.wait();
        })
        it("Updates the ticket count", async () => {
            const occasion = await tokenMaster.occasionMapping(OCCASION_ID);
            expect(occasion.tickets).equal(occasion.maxTickets - 1n);
        })
        it('Updates buying status', async () => {
            const status = await tokenMaster.hasBought(OCCASION_ID, buyer.address)
            expect(status).equal(true)
        })
        it('Updates seat status', async () => {
            const seatOwner = await tokenMaster.seatTaken(OCCASION_ID, SEAT);
            expect(seatOwner).equal(buyer.address)
        })
        it('Updates overall seating status', async () => {
            const seats = await tokenMaster.getSeatsTaken(OCCASION_ID);
            expect(seats.length).equal(1);
            expect(seats).includes(SEAT)
        })
        it('Updates contract balance', async () => {
            const balance = await hre.ethers.provider.getBalance(await tokenMaster.getAddress());
            expect(balance).equal(AMOUNT)
        })
    })
})