const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const chai = require("chai");

const expect = chai.expect;
const should = chai.should();

describe("testToken unit testing", () => {
	let accounts;
	const init = {
		name: "fancyBlues",
		symbol: "FCBL",
		supply: 9999,
	};

	beforeEach(async () => {
		const obj = await ethers.getSigners();
		accounts = obj.slice(0, 3);
	});

	async function tokenFixture() {
		const { name, symbol, supply } = init;
		const TestToken = await ethers.getContractFactory("TestToken");
		const testToken = await TestToken.deploy(name, symbol, supply);
		return testToken;
	}

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

	describe("Basic functions", () => {
		it(`owners should have balance equal to ${init.supply}`, async () => {
			const [owner] = accounts;
			const testToken = await loadFixture(tokenFixture);
			expect(await testToken.balanceOf(owner.address)).to.be.eq(9999);
		});

		it(`owner should transfer 20 tokens to addr1`, async () => {
			const [owner, addr1] = accounts;
			const testToken = await loadFixture(tokenFixture);

			await expect(testToken.transfer(addr1.address, 20)).to.be.fulfilled.and.to.emit(testToken, "Transfer");
			expect(await testToken.balanceOf(owner.address)).to.be.eq(9979);
			expect(await testToken.balanceOf(addr1.address)).to.be.eq(20);
		});

		it("revert on transferring 100 tokens from account with 0 tokens", async () => {
			const [owner, addr1] = accounts;
			const testToken = await loadFixture(tokenFixture);
			await expect(testToken.connect(addr1).transfer(owner.address, 100)).to.be.reverted;
		});

		it("throw error on transferring negative tokens", async () => {
			const [owner, addr1] = accounts;
			const testToken = await loadFixture(tokenFixture);
			await expect(testToken.transfer(owner.address, -10)).to.be.rejected;
		});
	});

	describe("Allowance functions", () => {
		let localTokenInstance;
		it("should approve addr1 to use 50 tokens from owner and trigger an approve event", async () => {
			localTokenInstance = await loadFixture(tokenFixture);
			const [owner, addr1] = accounts;
			await expect(localTokenInstance.approve(addr1.address, 50)).to.be.fulfilled.and.to.emit(
				localTokenInstance,
				"Approval"
			);
		});

		it("should return 50 token allowance from owner to addr1", async () => {
			const [owner, addr1] = accounts;
			expect(await localTokenInstance.allowance(owner.address, addr1.address)).to.be.eq(50);
		});

		it("should revert if addr1 approves 50 allowance to owner: insufficient balance", async () => {
			const [owner, addr1, addr2] = accounts;
			await expect(localTokenInstance.connect(addr1).approve(owner.address, 50)).to.be.reverted;
		});

		it("should transfer 30 tokens from addr1 to addr2 from owners allowance", async () => {
			const [owner, addr1, addr2] = accounts;
			await expect(localTokenInstance.connect(addr1).transferFrom(owner.address, addr2.address, 30)).to.be
				.fulfilled;
			expect(
				await localTokenInstance.allowance(owner.address, addr1.address),
				"addr1 allowance decreased to 20"
			).to.be.eq(20);
			expect(await localTokenInstance.balanceOf(addr2.address), "addr2 balance increased to 30").to.be.eq(30);
		});

		it("should revert if allowance transaction is made with insufficent balance", async () => {
			const [owner, addr1, addr2] = accounts;
			await expect(localTokenInstance.connect(addr1).transferFrom(owner.address, addr2.address, 250)).to.be
				.reverted;
		});
	});
});
