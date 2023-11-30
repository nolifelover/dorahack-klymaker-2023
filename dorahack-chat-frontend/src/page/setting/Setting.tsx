/* eslint-disable @typescript-eslint/no-explicit-any */

// import { toast } from 'react-toastify';
// import { errorFormat } from '../../helper/error-format';
// import { createLensProfile, getLensProfile } from '../../helper/lens';
// import { useDeepEffect } from '../../hook/useDeepEffect';
// import { useSelector } from '../../redux';
import { useContext } from 'react';
// import { useNetwork } from 'wagmi';
// import { updateLensProfile } from '../../rest-api/conversation';
// import { TextInput, ToggleSwitch, Button } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { connectSnap, getSnap, isLocalSnap } from '../../helper/snap';
import { MetaMaskContext, MetamaskActions } from '../../hook/MetamaskContext';
import environment from '../../environment';

export default function Setting() {
  // const { chain } = useNetwork();
  // const [lensHandle, setLensHandle] = useState('');
  // const { user } = useSelector(state => state.account);
  // const [lensProfile, setLensProfile] = useState<any>(null);
  // const [notification, setNotification] = useState(false);
  const [state, dispatch] = useContext(MetaMaskContext);
  // const [fetching, setFetching] = useState(true);
  const isMetaMaskReady = isLocalSnap(environment.defaultSnapOrigin)
    ? state.isFlask
    : state.snapsDetected;

  const handleConnectClick = async () => {
    try {
      await connectSnap();

      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };
  // useDeepEffect(() => {
  //   (async () => {
  //     if (user) {
  //       const profile = await getLensProfile(user.lensId);
  //       if (profile) {
  //         setLensProfile(profile);
  //       }
  //     }
  //     setFetching(false);
  //   })();
  // }, [user]);

  // const createLens = async () => {
  //   try {
  //     if (user) {
  //       const createResponse = await createLensProfile(
  //         user.publicAddress,
  //         lensHandle
  //       );

  //       if (createResponse) {
  //         await updateLensProfile(createResponse.items[0].id);
  //         window.location.reload();
  //       }
  //     }
  //   } catch (error) {
  //     toast.error(errorFormat(error).message);
  //   } finally {
  //     setLensHandle('');
  //   }
  // };

  // if (fetching) return null;

  return (
    <section className="bg-white dark:bg-gray-900 flex justify-center w-full">
      <div className="py-8 px-12 mx-auto w-full sm:py-16 lg:px-6 ">
        <h2 className="mb-6 lg:mb-8 text-3xl lg:text-4xl tracking-tight font-extrabold text-start text-gray-900 dark:text-white">
          Settings
        </h2>
        {/* <div className="mx-auto w-full">
          {chain?.id === 80001 && (
            <>
              <h2 id="accordion-flush-heading-2">
                <div
                  className={
                    (lensProfile ? 'cursor-pointer ' : ' ') +
                    'flex justify-between items-center py-5 w-full font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'
                  }>
                  <span>Lens profile</span>
                  {lensProfile ? (
                    <>
                      <div className="flex items-center gap-3">
                        @{lensProfile?.handle?.fullHandle}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <TextInput
                        className="w-full bg-gray-50 border-gray-300"
                        placeholder="Enter wallet address "
                        sizing="md"
                        value={lensHandle}
                        onChange={e => setLensHandle(e.target.value)}
                      />
                      <Button color="primary" onClick={() => createLens()}>
                        Create
                      </Button>
                    </div>
                  )}
                </div>
              </h2>
            </>
          )}
        </div> */}
        <div className="mx-auto w-full">
          <div>
            <h2 id="accordion-flush-heading-2">
              <div
                className={
                  'flex justify-between items-center py-5 w-full font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'
                }>
                <span>Meta mask snap</span>
                <Button onClick={() => handleConnectClick()}>
                  Enable SocialBureau Notification
                </Button>
              </div>
            </h2>
          </div>
        </div>
        {/* <div className="flex max-w-md flex-col mt-4">
          <ToggleSwitch
            checked={notification}
            label="Notification"
            onChange={setNotification}
          />
        </div>{' '}
        <div className="flex max-w-md flex-col mt-4">
          <ToggleSwitch
            checked={notification}
            label="Notification"
            onChange={setNotification}
          />
        </div>{' '} */}
      </div>
    </section>
  );
}

// import {
//   useManageSubscription,
//   useSubscription,
//   useW3iAccount,
//   useInitWeb3InboxClient,
//   useMessages,
// } from '@web3inbox/widget-react';
// import { useCallback, useEffect } from 'react';
// import { useSignMessage, useAccount } from 'wagmi';
// import environment from '../../environment';

// const projectId = environment.walletconnectProjectId;
// const domain = environment.web3InboxDomain;

// export default function App() {
//   const { address } = useAccount();
//   const { signMessageAsync } = useSignMessage();

//   console.log(domain);

//   // Initialize the Web3Inbox SDK
//   const isReady = useInitWeb3InboxClient({
//     // The project ID and domain you setup in the Domain Setup section
//     projectId,
//     domain,

//     // Allow localhost development with "unlimited" mode.
//     // This authorizes this dapp to control notification subscriptions for all domains (including `app.example.com`), not just `window.location.host`
//     isLimited: false,
//   });

//   const { account, setAccount, isRegistered, isRegistering, register } =
//     useW3iAccount();
//   useEffect(() => {
//     if (!address) return;
//     // Convert the address into a CAIP-10 blockchain-agnostic account ID and update the Web3Inbox SDK with it
//     setAccount(`eip155:1:${address}`);
//   }, [address, setAccount]);

//   // In order to authorize the dapp to control subscriptions, the user needs to sign a SIWE message which happens automatically when `register()` is called.
//   // Depending on the configuration of `domain` and `isLimited`, a different message is generated.
//   const performRegistration = useCallback(async () => {
//     if (!address) return;
//     try {
//       await register(message => signMessageAsync({ message }));
//     } catch (registerIdentityError) {
//       alert(registerIdentityError);
//     }
//   }, [signMessageAsync, register, address]);

//   useEffect(() => {
//     // Register even if an identity key exists, to account for stale keys
//     performRegistration();
//   }, [performRegistration]);

//   const { isSubscribed, isSubscribing, subscribe } = useManageSubscription();

//   const performSubscribe = useCallback(async () => {
//     // Register again just in case
//     await performRegistration();
//     await subscribe();
//   }, [subscribe, isRegistered]);

//   const { subscription } = useSubscription();
//   const { messages } = useMessages();

//   return (
//     <>
//       {!isReady ? (
//         <div>Loading client...</div>
//       ) : (
//         <>
//           {!address ? (
//             <div>Connect your wallet</div>
//           ) : (
//             <>
//               <div>Address: {address}</div>
//               <div>Account ID: {account}</div>
//               {!isRegistered ? (
//                 <div>
//                   To manage notifications, sign and register an identity
//                   key:&nbsp;
//                   <button
//                     onClick={performRegistration}
//                     disabled={isRegistering}>
//                     {isRegistering ? 'Signing...' : 'Sign'}
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   {!isSubscribed ? (
//                     <>
//                       <button
//                         onClick={performSubscribe}
//                         disabled={isSubscribing}>
//                         {isSubscribing
//                           ? 'Subscribing...'
//                           : 'Subscribe to notifications'}
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <div>You are subscribed</div>
//                       <div>Subscription: {JSON.stringify(subscription)}</div>
//                       <div>Messages: {JSON.stringify(messages)}</div>
//                     </>
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </>
//   );
// }
