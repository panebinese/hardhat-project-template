import { expect } from "chai";
import { ethers } from "hardhat";
import { Greeter, Greeter__factory } from "../typechain";

describe("Greeter", () => {
  let greeterContractFactory: Greeter__factory;
  let greeter: Greeter;

  before(async () => {
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
});
