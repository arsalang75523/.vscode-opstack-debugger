const { expect } = require("chai");
require("@nomicfoundation/hardhat-chai-matchers");
const { ethers } = require("hardhat");

describe("TestToken", function () {
  let token;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("TestToken", owner);
    token = await Token.deploy();
    await token.waitForDeployment();
  });

  it("Should transfer tokens correctly", async function () {
    await token.connect(owner).transfer(addr1.address, 100n);
    const balance = await token.balanceOf(addr1.address);
    expect(balance).to.equal(100n);
  });

  it("Should fail if sender doesn't have enough tokens", async function () {
    await expect(token.connect(addr1).transfer(addr2.address, 100n)).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
  });
});
