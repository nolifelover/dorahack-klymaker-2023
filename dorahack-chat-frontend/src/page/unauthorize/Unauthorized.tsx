import { useAccount, useNetwork } from 'wagmi';
import UnauthorizedWallet from '../../component/unauthorized/UnauthorizedWallet';
import UnauthorizedNetwork from '../../component/unauthorized/UnauthorizedNetwork';

export default function Unauthorized() {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const displayComponent = () => {
    if (!address) return <UnauthorizedWallet />;
    if (chain?.unsupported) return <UnauthorizedNetwork />;
    return <></>;
  };

  return <>{displayComponent()}</>;
}
