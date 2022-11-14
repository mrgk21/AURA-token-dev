require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-web3");
require("@nomicfoundation/hardhat-chai-matchers");

require("dotenv").config();

module.exports = {
	solidity: "0.8.17",
	networks: {
		sepolia: {
			url: process.env.SEPOLIA_API_URL,
			accounts: [`0x${process.env.ACC1_PRIVATE_KEY}`],
		},
	},
};
