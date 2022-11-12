const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("testToken unit testing", () => {
	const init = {
		name: "fancyBlues",
		symbol: "FCBL",
		supply: 9999,
	};

	tokenFixture = async () => {
		const { name, symbol, supply } = init;
		const [owner] = await ethers.getSigners();
		const TestToken = await ethers.getContractFactory("TestToken");
		const testToken = await TestToken.deploy(name, symbol, supply);
		return testToken;
	};

	accountAddrFixture = async () => {
		const { owner, addr1, addr2 } = await ethers.getSigners();
		return { owner, addr1, addr2 };
	};

	describe("Contract initialization", () => {
		it(`should have total supply equal to ${init.supply}`, async () => {
			const testToken = await loadFixture(tokenFixture);
			expect(await testToken.totalSupply()).to.equal(init.supply);
		});

		it(`should have name equal to ${init.name}`, async () => {
			const testToken = await loadFixture(tokenFixture);
			expect(await testToken.name()).to.equal(init.name);
		});

		it(`should have symbol equal to ${init.symbol}`, async () => {
			const testToken = await loadFixture(tokenFixture);
			expect(await testToken.symbol()).to.equal(init.symbol);
		});
	});

	describe("Utility functions", () => {
		it(`owners should have balance equal to ${init.supply}`, async () => {
			const { owner } = await loadFixture(accountAddrFixture);
			const testToken = await loadFixture(tokenFixture);
			expect(await testToken.balanceOf(owner.address)).to.equal(init.supply);
		});
	});
});
