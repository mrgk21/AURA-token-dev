const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ownable unit testing", () => {
	generalFixture = async () => {
		const [owner] = await ethers.getSigners();
		const Ownable = await ethers.getContractFactory("Ownable");
		const ownable = await Ownable.deploy();
		return { owner, ownable };
	};

	it("should have msg.sender as the owner", async () => {
		const { owner, ownable } = await loadFixture(generalFixture);
		const _owner = await ownable.owner();
		expect(_owner).to.equal(owner.address);
	});
});
