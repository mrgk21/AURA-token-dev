const Web3 = require("web3");
const web3 = new Web3("https://sepolia.infura.io/v3/d6474febc754452393fa817af71e46aa");

const abi = [
	{
		inputs: [
			{
				internalType: "string",
				name: "_initName",
				type: "string",
			},
			{
				internalType: "string",
				name: "_initSymbol",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_initSupply",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "_owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "_spender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "_from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "_to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		inputs: [],
		name: "_name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "_symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "_totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_owner",
				type: "address",
			},
			{
				internalType: "address",
				name: "_spender",
				type: "address",
			},
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "remaining",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "approvals",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "success",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_owner",
				type: "address",
			},
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "balances",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "success",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_from",
				type: "address",
			},
			{
				internalType: "address",
				name: "_to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "success",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

const token = new web3.eth.Contract(abi, "0x5513659209fa77dce01F70862495ab0db596853C");

// process.env.ACC1_PRIVATE_KEY
const acc1 = "0x54fCe65792cbC7ad71c7220D6461D023A4d413a6";
const acc2 = "0x8f2307D33dF3ee365213701947eBF48B5315d040";

const { balanceOf, transfer, name } = token.methods;

balanceOf(acc1).call((err, res) => {
	console.log(res);
});

transfer(acc2, 10)
	.send({ from: acc1 })
	.on("receipt", (err, res) => {
		if (err) console.log(err);
		else console.log(res);
	});

balanceOf(acc2).call((err, res) => {
	console.log(res);
});
