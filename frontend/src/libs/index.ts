import { ethers } from "ethers";
import TokenMasterAbi from "../abis/TokenMaster.json";
import ContractConfig from "../contract.config.json"
import { TokenMaster } from "../../types/ethers-contracts";

export type Occasion = {
    id: string;
    name: string;
    cost: string;
    tickets: number;
    maxTickets: number;
    date: string;
    time: string;
    location: string;
}

export const RPC_URL = 'http://127.0.0.1:8545/'

export const CHAIN_ID = '31337'

export const TOKEN_MASTER_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function deployTokenMaster(name: string, symbol: string) {
    const signer = await getSigner();
    const contractFactory = new ethers.ContractFactory(TokenMasterAbi, ContractConfig[31337].TokenMaster.bytecode, signer)
    const contract = await contractFactory.deploy(name, symbol)
    const address = await contract.getAddress()
    return address;
}

export async function getTokenMasterContract(address: string) {
    const provider = new ethers.JsonRpcProvider(RPC_URL)

    // Check if the contract exists
    const code = await provider.getCode(address);
    if (code === '0x') {
        // Contract doesn't exist
        throw new Error('Contract does not exist at the specified address');
    }

    const contract = new ethers.Contract(address, TokenMasterAbi, provider)
    return contract as unknown as TokenMaster;
}

export const getSigner = async () => {
    if (window.ethereum === undefined) {
        throw new Error('Please install Metamask')
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    return await provider.getSigner();
}

export const getOccasionList: () => Promise<Occasion[]> = async () => {
    const tokenMaster = await getTokenMasterContract(TOKEN_MASTER_ADDRESS);
    const occasionIdList = await tokenMaster.getOccasionList();
    const promiseList = occasionIdList.map(async (occasionId) => {
        const res = await tokenMaster.getOccasion(occasionId);
        const { id, name, cost, tickets, maxTickets, date, time, location } = res;
        return {
            id: id.toString(),
            name,
            cost: cost.toString(),
            tickets: Number(tickets),
            maxTickets: Number(maxTickets),
            date,
            time,
            location
        }
    });
    return await Promise.all(promiseList);
}

export const mint = async (occasionId: string, seat: number, amount: string) => {
    const tokenMaster = await getTokenMasterContract(TOKEN_MASTER_ADDRESS);
    const signer = await getSigner();
    const transaction = await tokenMaster.connect(signer).mint(occasionId, seat, { value: amount })
    await transaction.wait();
}

export const getSeatsTaken = async (occasionId: string) => {
    const tokenMaster = await getTokenMasterContract(TOKEN_MASTER_ADDRESS);
    return await tokenMaster.getSeatsTaken(occasionId);
}