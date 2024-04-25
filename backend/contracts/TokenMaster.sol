// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract TokenMaster is ERC721 {
    address public owner;
    uint256 public occasionCounter;
    uint256 public nftCounter;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    mapping(uint256 => Occasion) public occasionMapping;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) public seatsTaken;
    mapping(uint256 => mapping(address => bool)) public hasBought;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        occasionCounter++;
        occasionMapping[occasionCounter] = Occasion(
            occasionCounter,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
        );
    }

    function mint(uint256 _id, uint256 _seat) public payable {
        require(_id != 0 && _id <= occasionCounter);

        require(msg.value == occasionMapping[_id].cost, "insufficient value");

        require(occasionMapping[_id].tickets > 0, "sold out");

        address emptyAddress;
        require(seatTaken[_id][_seat] == emptyAddress, "seat taken");

        require(!hasBought[_id][msg.sender], "cannot buy more than 1 ticket");

        occasionMapping[_id].tickets -= 1;

        hasBought[_id][msg.sender] = true;

        seatTaken[_id][_seat] = msg.sender;

        seatsTaken[_id].push(_seat);

        nftCounter++;
        _safeMint(msg.sender, nftCounter);
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Server balance is zero");
        payable(owner).transfer(balance);
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occasionMapping[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }
}
