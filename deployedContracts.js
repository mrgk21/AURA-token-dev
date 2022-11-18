const contracts = [
	{
		id: 1,
		name: "fancyBrocolli token",
		symbol: "FBRC",
		totalSupply: 100000000,
		creationAccount: {
			address: "0x54fCe65792cbC7ad71c7220D6461D023A4d413a6",
			key: `0x${process.env.ACC1_PRIVATE_KEY}`,
		},
		address: "0x741573A38E1078b4093177D25CaB784A59E7E8CE",
		type: "ERC20",
	},
	{
		id: 2,
		name: "fancyTomato token",
		symbol: "FTMT",
		totalSupply: 100000000,
		creationAccount: {
			address: "0x54fCe65792cbC7ad71c7220D6461D023A4d413a6",
			key: `0x${process.env.ACC1_PRIVATE_KEY}`,
		},
		address: "0x5513659209fa77dce01F70862495ab0db596853C",
		type: "ERC20",
	},
	{
		//0x4545761717E1aEB030C99e178968E08A4Ce27B10
		//this one is perfect: fixed transactionfrom bug
		id: 3,
		name: "fancyApple token",
		symbol: "FAPPL",
		totalSupply: 100000000,
		creationAccount: {
			address: "0x54fCe65792cbC7ad71c7220D6461D023A4d413a6",
			key: `0x${process.env.ACC1_PRIVATE_KEY}`,
		},
		address: "0xb65CE4dC4e457e91bB07fD99954579804228f9A5",
		type: "ERC20",
	},
	{
		//implemented faucet code
		id: 4,
		name: "fancyBanana token",
		symbol: "FBNNA",
		totalSupply: 100000000,
		creationAccount: {
			address: "0x54fCe65792cbC7ad71c7220D6461D023A4d413a6",
			key: `0x${process.env.ACC1_PRIVATE_KEY}`,
		},
		address: "0x4545761717E1aEB030C99e178968E08A4Ce27B10",
		type: "ERC20",
	},
	{
		//implemented faucet code
		id: 5,
		name: "Aurora token",
		symbol: "AURA",
		totalSupply: 100000000,
		creationAccount: {
			address: "0x54fCe65792cbC7ad71c7220D6461D023A4d413a6",
			key: `0x${process.env.ACC1_PRIVATE_KEY}`,
		},
		address: "0x37e97312DFbF16dEB489875751a2B982aA17b2cF",
		type: "ERC20",
	},
];
