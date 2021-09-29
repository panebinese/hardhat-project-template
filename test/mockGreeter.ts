import { ethers } from "hardhat";
import chai, { expect } from "chai";
import { Signer } from "ethers";
import {
  smock,
  MockContractFactory,
  MockContract,
} from "@defi-wonderland/smock";
import { solidity } from "ethereum-waffle";
import { Greeter, Greeter__factory } from "../typechain";

chai.use(smock.matchers);
chai.use(solidity);

describe("mockGreeter", () => {
  let accounts: Signer[];
  let greeterContractFactory: MockContractFactory<Greeter__factory>;
  let greeter: MockContract<Greeter>;

  before(async () => {
    accounts = await ethers.getSigners();
    greeterContractFactory = await smock.mock<Greeter__factory>("Greeter");
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
