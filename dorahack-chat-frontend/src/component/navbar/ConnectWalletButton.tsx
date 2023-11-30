import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button, Spinner } from 'flowbite-react';
import trimAddress from '../../helper/trim-address';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

export default function ConnectWalletButton() {
  const { open } = useWeb3Modal();
  const { address, isConnecting } = useAccount();
  const { isLoading: isDisconnecting } = useDisconnect();
  const { chain } = useNetwork();

  if (isConnecting || isDisconnecting) {
    return (
      <Button>
        <Spinner size="sm" />
        <span className="pl-3">Loading...</span>
      </Button>
    );
  }

  if (!address) {
    return (
      <Button onClick={() => open({ view: 'Networks' })}>Connect Wallet</Button>
    );
  } else {
    if (chain?.unsupported) {
      return (
        <>
          <Button
            color="failure"
            size="sm"
            onClick={() => open({ view: 'Networks' })}>
            Wrong Network
          </Button>
        </>
      );
    }
    return (
      <Button color="gray" size="sm">
        <span className="text-gray-400">{trimAddress(address)}</span>
      </Button>
    );
  }
}
