export const contractAddress = "0x19C59a273eBc46F1c63b7D3b74C8b82D54C20F6c";

export const contractAbi = [
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "amountCollected",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newAmount", type: "uint256" }],
    name: "changeCollectAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "collect",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxCollectAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
