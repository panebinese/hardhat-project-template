import { ethers, upgrades } from "hardhat";
import chai, { expect } from "chai";
import { Signer } from "ethers";
import { solidity } from "ethereum-waffle";
import { Box, Box__factory } from "../typechain";

chai.use(solidity);

describe("Box", () => {
  let accounts: Signer[];
  let boxContractFactory: Box__factory;
  let box: Box;

  before(async () => {
    accounts = await ethers.getSigners();
    boxContractFactory = <Box__factory>await ethers.getContractFactory("Box");
    box = <Box>await upgrades.deployProxy(boxContractFactory, [0], {
      initializer: "store",
    });
    await box.deployed();
  });

  it("Must return the value if called retrieve.", async () => {
    const val = await box.retrieve();
    expect(val).to.eq(0);
  });

  it("Must emit ValueChanged if called store.", async () => {
    const tx = box.store(42);
    await expect(tx).to.emit(box, "ValueChanged").withArgs(42);
  });

  it("Must return the value if called retrieve after changed.", async () => {
    const val = await box.retrieve();
    expect(val).to.eq(42);
  });
});
