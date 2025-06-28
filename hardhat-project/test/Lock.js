const { expect } = require("chai");
require("@nomicfoundation/hardhat-chai-matchers");
const { ethers } = require("hardhat");

describe("Lock", function () {
  async function deployLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = BigInt(Math.floor(Date.now() / 1000) + ONE_YEAR_IN_SECS);
    const lockedAmount = ethers.parseEther("0.00002");

    const Lock = await ethers.getContractFactory("Lock");
    const [owner] = await ethers.getSigners();
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    await lock.waitForDeployment();

    return { lock, unlockTime, lockedAmount, owner };
  }

  it("Should set the right unlockTime", async function () {
    const { lock, unlockTime } = await deployLockFixture();
    expect(await lock.unlockTime()).to.equal(unlockTime);
  });

  it("Should set the right owner", async function () {
    const { lock, owner } = await deployLockFixture();
    expect(await lock.owner()).to.equal(owner.address);
  });

  it("Should receive and store the funds to lock", async function () {
    const { lock, lockedAmount } = await deployLockFixture();
    const balance = await ethers.provider.getBalance(lock.target);
    expect(balance).to.equal(lockedAmount);
  });

  it("Should fail if the unlockTime is not in the future", async function () {
    const pastTime = BigInt(Math.floor(Date.now() / 1000) - 1000);
    const lockedAmount = ethers.parseEther("0.001");
    const Lock = await ethers.getContractFactory("Lock");

    await expect(
      Lock.deploy(pastTime, { value: lockedAmount })
    ).to.be.revertedWith("Unlock time should be in the future");
  });

  it("Should revert with the right error if called too soon", async function () {
    const { lock } = await deployLockFixture();
    await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
  });
});
