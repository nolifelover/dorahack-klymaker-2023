import { ethers } from 'ethers';
import { goerli, lineaTestnet, sepolia, polygonMumbai, celoAlfajores, mantleTestnet, polygonZkEvmTestnet } from 'viem/chains';
import { chilizSpicyTestnet } from './chains';

const contractAddresses: Readonly<{
  [contractName: string]: { [chainId: number]: string | undefined };
}> = {
  Prontera: {
    [sepolia.id]: '0xf7a126aDe9268742409BBe4B1f79243c6430605A',
    [goerli.id]: '0xf7a126aDe9268742409BBe4B1f79243c6430605A',
    [lineaTestnet.id]: '0xf7a126aDe9268742409BBe4B1f79243c6430605A',
    [polygonMumbai.id]: '0xf7a126aDe9268742409BBe4B1f79243c6430605A',
    [celoAlfajores.id]: '0xf7a126aDe9268742409BBe4B1f79243c6430605A',
    [mantleTestnet.id]: '0xf7a126aDe9268742409BBe4B1f79243c6430605A',
    [polygonZkEvmTestnet.id]: '0xf7a126aDe9268742409BBe4B1f79243c6430605A',
    [lineaTestnet.id]: '0xf7a126aDe9268742409BBe4B1f79243c6430605A',
    [chilizSpicyTestnet.id]: '0xf7a126aDe9268742409BBe4B1f79243c6430605A',
  },
};

function getContractAddress(contractName: string, chainId: number): string {
  // check if contract name is in the list
  if (!(contractName in contractAddresses))
    throw new Error('No such contract: ' + contractName);

  // check if contract address is added
  if (!(chainId in contractAddresses[contractName]))
    throw new Error('Contract not in chainId: ' + chainId);

  const addr = contractAddresses[contractName][chainId];

  // you might intentionally set address to undefined during development
  if (addr == undefined) throw new Error('Address not yet defined.');
  if (!ethers.utils.isAddress(addr)) throw new Error('Invalid address format.');

  return addr;
}

export default getContractAddress;
