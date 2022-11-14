async function main() {
	const TestToken = await ethers.getContractFactory("TestToken");
	const testTokenContract = await TestToken.deploy("fancyBrocolli token", "FBRC", 100000000);
	console.log("Contract deployed to address:", testTokenContract.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
