import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button } from 'flowbite-react';
import { useAccount } from 'wagmi';

export default function UnauthorizedWallet() {
  const { open } = useWeb3Modal();
  const { isConnecting } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh_-_4rem)]">
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh_-_4rem)]">
        <img alt="" src="/svg/launch.svg" className="lg:max-w-md" />
        <h1 className="mb-3 mt-6 w-4/5 text-center text-4xl font-bold dark:text-white text-gray-500">
          Connect Wallet to Continue
        </h1>
        <p className="mb-6 w-4/5 max-w-3xl text-center text-lg text-gray-500 dark:text-gray-300">
          Connect Wallet to Continue
        </p>
        <Button
          disabled={isConnecting}
          onClick={() => open({ view: 'Networks' })}>
          Connect Wallet
        </Button>
      </div>
    </div>
  );
}
