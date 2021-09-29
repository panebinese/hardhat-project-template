import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { Greeter, Greeter__factory } from "../typechain";

describe("Greeter", () => {
  let accounts: Signer[];
  let greeterContractFactory: Greeter__factory;
  let greeter: Greeter;

  before(async () => {
    accounts = await ethers.getSigners();
    greeterContractFactory = <Greeter__factory>(
      await ethers.getContractFactory("Greeter")
    );
    greeter = await greeterContractFactory.deploy("Hello, world!");
    await greeter.deployed();
  });

  it("Should return the initial greeting", async () => {
    expect(await greeter.greet()).to.equal("Hello, world!");
  });

  it("Should return the new greeting once it's changed", async () => {
    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    // wait until the transaction is mined
    await setGreetingTx.wait();
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  it("Should revert when non owner try to change greeting message", async () => {
    const setGreetingTxP = greeter
      .connect(accounts[1])
      .setGreeting("こんにちは世界!");
    await expect(setGreetingTxP).to.be.revertedWith("You are not the owner.");
  });
});
