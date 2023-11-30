import { PropsWithChildren } from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import environment from '../environment';

const projectId = environment.walletconnectProjectId;

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [...environment.supportChains];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function WagmiProvider({ children }: PropsWithChildren) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
