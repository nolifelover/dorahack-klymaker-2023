import { PropsWithChildren } from 'react';
import { useNetwork } from 'wagmi';
import getContractAddress from '../constant/addresses';
import { errorFormat } from '../helper/error-format';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import abi from '../abi/prontera.json';
import { useDeepEffect } from '../hook/useDeepEffect';
import { useDispatch } from '../redux';
import {
  initializeContractSuccess,
  initializeContractFailure,
  resetContractState,
} from '../redux/contract';

export default function ContractPortal({ children }: PropsWithChildren) {
  const { chain } = useNetwork();
  const dispatch = useDispatch();

  useDeepEffect(() => {
    if (chain) {
      try {
        const contractAddress = getContractAddress('Prontera', chain.id);
        const provider = new ethers.providers.Web3Provider(window.ethereum!);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        dispatch(initializeContractSuccess({ contract: contractInstance }));
      } catch (error) {
        toast.error(errorFormat(error).message);
        dispatch(initializeContractFailure());
      }
    }

    return () => {
      dispatch(resetContractState());
    };
  }, [chain]);

  return <>{children}</>;
}
