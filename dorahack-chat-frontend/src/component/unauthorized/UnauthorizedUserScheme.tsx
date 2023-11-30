import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import { useDispatch, useSelector } from '../../redux';
import {
  CryptoECIES,
  CryptoMetaMask,
  generateSecret,
} from '../../helper/crypto';
import { errorFormat } from '../../helper/error-format';
import {
  initializeAccountFailure,
  initializeUserSchemeSuccess,
} from '../../redux/account';
import { useNavigate } from 'react-router-dom';
import environment from '../../environment';
import {
  useManageSubscription,
  // useSubscription,
  useW3iAccount,
  useInitWeb3InboxClient,
  // useMessages,
} from '@web3inbox/widget-react';
import { useCallback } from 'react';
import { useDeepEffect } from '../../hook/useDeepEffect';
// import axios from 'axios';

const projectId = environment.walletconnectProjectId;
const domain = environment.web3InboxDomain;

export default function UnauthorizedUserScheme() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const dispatch = useDispatch();
  const { contract } = useSelector(state => state.contract);
  const { isWidget } = useSelector(state => state.layout);
  const [userSchemeInitializing, setUserSchemeInitializing] = useState(false);

  useEffect(() => {
    if (!isWidget) {
      navigate('/');
    }
  }, [isWidget]);

  const initializeUserScheme = async () => {
    try {
      if (!address) {
        throw new Error('Wallet address not found.');
      }

      if (chain?.unsupported) {
        throw new Error('Chain unsupported.');
      }

      if (!contract) {
        throw new Error('Contract not found.');
      }

      setUserSchemeInitializing(true);

      // const result = await axios({
      //   url: 'https://api.thegraph.com/subgraphs/name/doctornasa/n2n-sepolia',
      //   method: 'post',
      //   data: {
      //     query: `
      //     query GetUserInitialize {
      //       userInitializeds(where: {user: "${address}"}) {
      //         id
      //         user
      //       }
      //     }
      //       `,
      //   },
      // });

      // const isUserInitialized = result?.data?.data?.userInitializeds?.length;

      const isUserInitialized =
        await contract.callStatic.isUserInitialized(address);

      let userScheme: CryptoECIES | null = null;

      // console.log({ isUserInitialized });

      if (!isUserInitialized) {
        const userSecret = generateSecret();
        const publicKey = Buffer.from(
          new CryptoECIES(userSecret).getPublicKey(),
          'hex'
        );

        const encryptedUserSecret = await new CryptoMetaMask(
          address,
          window.ethereum
        ).encrypt(userSecret);

        const tx = await contract.initializeUser(
          encryptedUserSecret.toJSON().data,
          publicKey[0] == 2,
          publicKey.slice(1).toJSON().data
        );
        await tx.wait();

        userScheme = new CryptoECIES(userSecret);
      } else {
        const userInitialization =
          await contract.callStatic.getUserInitialization(address);

        const encryptedUserSecret = Buffer.from(
          userInitialization.encryptedUserSecret.slice(2),
          'hex'
        );

        const userSecret = await new CryptoMetaMask(
          address,
          window.ethereum
        ).decrypt(encryptedUserSecret);
        userScheme = new CryptoECIES(userSecret);
      }

      dispatch(initializeUserSchemeSuccess({ userScheme }));
    } catch (error) {
      toast.error(errorFormat(error).message);
      dispatch(initializeAccountFailure());
    } finally {
      setUserSchemeInitializing(false);
    }
  };

  const { signMessageAsync } = useSignMessage();

  const isReady = useInitWeb3InboxClient({
    projectId,
    domain,
    isLimited: false,
  });

  const { setAccount, isRegistered, register } = useW3iAccount();

  const { isSubscribed, subscribe, unsubscribe } = useManageSubscription();

  useDeepEffect(() => {
    if (!address) return;
    setAccount(`eip155:1:${address}`);
  }, [address, setAccount]);

  const performRegistration = useCallback(async () => {
    if (!address) return;
    try {
      await register(message => signMessageAsync({ message }));
    } catch (registerIdentityError) {
      alert(registerIdentityError);
    }
  }, [signMessageAsync, register, address]);

  useDeepEffect(() => {
    performRegistration();

    return () => {
      unsubscribe();
    };
  }, [performRegistration]);

  const web3InboxSubscribe = useCallback(async () => {
    if (isReady && !isSubscribed) await performRegistration();
    await subscribe();
  }, [subscribe, isRegistered]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh_-_4rem)]">
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh_-_4rem)]">
        <img alt="" src="/svg/launch.svg" className="lg:max-w-md" />
        <h1 className="mb-3 mt-6 w-4/5 text-center text-4xl font-bold dark:text-white text-gray-500">
          Chat Initialization
        </h1>
        <p className="mb-6 w-4/5 max-w-3xl text-center text-lg text-gray-500 dark:text-gray-300">
          Waiting for key decryption...
        </p>
        <Button
          className="w-[250px]"
          disabled={userSchemeInitializing}
          onClick={async () => {
            await initializeUserScheme();
            await web3InboxSubscribe();
          }}>
          {userSchemeInitializing ? 'Loading' : `Let's SocialBureau.`}
        </Button>
      </div>
    </div>
  );
}
