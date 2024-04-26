import hre from "hardhat";
const tokens = (n: string | number) => {
    return hre.ethers.parseEther(n.toString())
}
const occasions = [
    {
        name: "UFC Miami",
        cost: tokens(3),
        tickets: 0,
        date: "May 31",
        time: "6:00PM EST",
        location: "Miami-Dade Arena - Miami, FL"
    },
    {
        name: "ETH Tokyo",
        cost: tokens(1),
        tickets: 125,
        date: "Jun 2",
        time: "1:00PM JST",
        location: "Tokyo, Japan"
    },
    {
        name: "ETH Privacy Hackathon",
        cost: tokens(0.25),
        tickets: 200,
        date: "Jun 9",
        time: "10:00AM TRT",
        location: "Turkey, Istanbul"
    },
    {
        name: "Dallas Mavericks vs. San Antonio Spurs",
        cost: tokens(5),
        tickets: 0,
        date: "Jun 11",
        time: "2:30PM CST",
        location: "American Airlines Center - Dallas, TX"
    },
    {
        name: "ETH Global Toronto",
        cost: tokens(1.5),
        tickets: 125,
        date: "Jun 23",
        time: "11:00AM EST",
        location: "Toronto, Canada"
    }
]
const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const TokenMaster = await hre.ethers.getContractFactory('TokenMaster');
    const tokenMaster = await TokenMaster.connect(deployer).deploy('TokenMaster', 'TM');
    const contractAddress = await tokenMaster.getAddress();
    console.log(`Deployed TokenMaster Contract at: ${contractAddress}`);

    const promiseList = occasions.map(async (o, i) => {
        const transaction = await tokenMaster.list(o.name, o.cost, o.tickets, o.date, o.time, o.location);
        await transaction.wait();
        return `Listed Event ${i + 1}: ${o.name}`
    })
    const res = await Promise.all(promiseList);
    res.map(output => console.log(output))
}

main().catch(err => {
    console.error(err)
    process.exitCode = 1;
})