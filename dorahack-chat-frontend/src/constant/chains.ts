import { defineChain } from "viem";

export const chilizSpicyTestnet = /*#__PURE__*/ defineChain({
  id: 88882,
  name: 'Chiliz Spicy Testnet',
  network: 'chiliz-spicy-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'CHZ',
    symbol: 'CHZ',
  },
  rpcUrls: {
    default: {
      http: ['https://spicy-rpc.chiliz.com', 'https://chiliz-spicy.publicnode.com'],
    },
    public: {
      http: ['https://spicy-rpc.chiliz.com', 'https://chiliz-spicy.publicnode.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Chiliz Spicy Explorer',
      url: 'https://spicy-explorer.chiliz.com',
    },
  },
})

export const klytnBaobabTestnet = /*#__PURE__*/ defineChain({
  id: 88882,
  name: 'Klaytn Baobab Testnet',
  network: 'klaytn-baobab-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'KLAY',
    symbol: 'KLAY',
  },
  rpcUrls: {
    default: {
      http: ['https://public-en-baobab.klaytn.net', 'https://klaytn-baobab.blockpi.network/v1/rpc/public'],
    },
    public: {
      http: ['https://public-en-baobab.klaytn.net', 'https://klaytn-baobab.blockpi.network/v1/rpc/public'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Klaytnscope Explorer',
      url: 'https://baobab.klaytnscope.com',
    },
  },
})