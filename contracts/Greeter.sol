//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    address private ownerAddress;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
        ownerAddress = msg.sender;
    }

    modifier onlyOwner() {
        console.log(
            "Checking sender address, owner:",
            ownerAddress,
            ", sender:",
            msg.sender
        );
        require(msg.sender == ownerAddress, "You are not the owner.");
        _;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public onlyOwner {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
