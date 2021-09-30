import { ethers, upgrades } from "hardhat";
import chai, { expect } from "chai";
import { Signer } from "ethers";
import { solidity } from "ethereum-waffle";
import { Box, BoxV2, Box__factory, BoxV2__factory } from "../typechain";

chai.use(solidity);

describe("Box", () => {
  let accounts: Signer[];
  let boxContractFactory: Box__factory;
  let box: Box;
  let boxv2ContractFactory: BoxV2__factory;
  let boxv2: BoxV2;

  before(async () => {
    accounts = await ethers.getSigners();
    boxContractFactory = <Box__factory>await ethers.getContractFactory("Box");
    box = <Box>await upgrades.deployProxy(boxContractFactory, [0], {
      initializer: "store",
    });
    await box.deployed();
    boxv2ContractFactory = await ethers.getContractFactory("BoxV2");
  });

  it("Must return the value if called retrieve.", async () => {
    const val = await box.retrieve();
    expect(val).to.eq(0);
  });

  it("Must emit ValueChanged if called store.", async () => {
    const tx = box.store(42);
    await expect(tx).to.emit(box, "ValueChanged").withArgs(42);
  });

  it("Must return the value if called retrieve after store.", async () => {
    const val = await box.retrieve();
    expect(val).to.eq(42);
  });

  it("Must can upgrade the contract.", async () => {
    boxv2 = <BoxV2>await upgrades.upgradeProxy(box, boxv2ContractFactory);
    expect(box.address).to.eq(boxv2.address);
  });

  it("Must remind the value.", async () => {
    const valv1 = await box.retrieve();
    const valv2 = await boxv2.retrieve();
    expect(valv1).to.eq(42);
    expect(valv2).to.eq(42);
  });

  it("Must emit ValueChanged if called increment.", async () => {
    const tx = boxv2.increment();
    await expect(tx).to.emit(boxv2, "ValueChanged").withArgs(43);
  });

  it("Must return the value if called retrieve after increment.", async () => {
    const valv1 = await box.retrieve();
    const valv2 = await boxv2.retrieve();
    expect(valv1).to.eq(43);
    expect(valv2).to.eq(43);
  });
});
