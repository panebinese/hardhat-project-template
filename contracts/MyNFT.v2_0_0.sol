// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract MyNFT_v2_0_0 is ERC721Upgradeable {
    string public greeting;

    function initialize() public initializer {
        __ERC721_init("MyNFT_v2_0_0", "MNFT_v2_0_0");
        greeting = "Hola, mundo!";
        console.log("initializeing a MyNFT with greeting:", greeting);
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
