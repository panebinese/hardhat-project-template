import chai, { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
import { MyNFT__factory, MyNFT } from "../typechain";

chai.use(solidity);

describe("MyNFT", () => {
  let accounts: Signer[];
  let mynftContractFactory: MyNFT__factory;
  let mynft: MyNFT;

  before(async () => {
    accounts = await ethers.getSigners();
    mynftContractFactory = <MyNFT__factory>(
      await ethers.getContractFactory("MyNFT")
    );
    mynft = await mynftContractFactory.deploy();
    await mynft.deployed();
  });

  it("Should return the greeting", async () => {
    expect(await mynft.greet()).to.equal("Hello, world!");
  });
});
