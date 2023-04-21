export const contractAddress = "0xE0D3c61F385F7c619d697fb9706cCcD3A2652dA9";

export const contractAbi = [
	{ stateMutability: "payable", type: "fallback" },
	{
		inputs: [],
		name: "collect",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "", type: "address" }],
		name: "hasCollected",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
		name: "withdraw",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{ stateMutability: "payable", type: "receive" },
];
