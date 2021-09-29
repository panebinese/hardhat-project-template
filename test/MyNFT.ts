import chai, { expect } from "chai";
import { Contract, Signer } from "ethers";
import { ethers, upgrades } from "hardhat";
import { solidity } from "ethereum-waffle";
import { MyNFT, MyNFTV200, MyNFTV200__factory, MyNFT__factory } from "../typechain";

chai.use(solidity);

describe("MyNFT", () => {
  let accounts: Signer[];
  let mynftContractFactoryV1: MyNFT__factory;
  let mynftV1: MyNFT;
  let mynftContractFactoryV2: MyNFTV200__factory;
  let mynftV2: MyNFTV200;

  before(async () => {
    accounts = await ethers.getSigners();
    mynftContractFactoryV1 = <MyNFT__factory>(
      await ethers.getContractFactory("MyNFT")
    );
    mynftV1 = <MyNFT>await upgrades.deployProxy(mynftContractFactoryV1);
    await mynftV1.deployed();
    mynftContractFactoryV2 = <MyNFTV200__factory>(
      await ethers.getContractFactory("MyNFT_v2_0_0")
    );
  });

  it("Should return the greeting", async () => {
    expect(await mynftV1.greet()).to.equal("Hello, world!");
  });

  it("Should return the greeting after upgrading", async () => {
    const mynftV2 = await upgrades.upgradeProxy(
      mynftV1.address,
      mynftContractFactoryV2
    );
    expect(await mynftV2.greet()).to.equal("Hello, world!");
  });

  it("Should return the new greeting once it's changed", async () => {
    const setGreetingTx = await mynftV2.setGreeting("Hola, mundo!");
    // wait until the transaction is mined
    await setGreetingTx.wait();
    expect(await mynftV2.greet()).to.equal("Hola, mundo!");
  });

});
