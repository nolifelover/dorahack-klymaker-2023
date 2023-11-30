// import { useW3iAccount } from '@web3inbox/widget-react';
import { PropsWithChildren, useState } from 'react';

// import { Button } from 'flowbite-react';
// import { notifyWalletconnect } from '../helper/notification';
import { useMessages } from '@web3inbox/widget-react';
import { useDeepEffect } from '../hook/useDeepEffect';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

export default function Web3InboxPortal({ children }: PropsWithChildren) {
  // const { account } = useW3iAccount();
  const { messages } = useMessages();
  const [firstMount, setFirstMount] = useState(true);

  useDeepEffect(() => {
    if (!isEmpty(messages) && !firstMount) {
      const latestMessage = JSON.parse(JSON.stringify(messages))[0];

      latestMessage?.message?.body &&
        toast.success(latestMessage?.message?.body);
    }
    setFirstMount(false);
  }, [messages]);

  return (
    <>
      {/* <Button
        onClick={() => {
          notifyWalletconnect({
            accounts: [account!],
            notification: {
              title: 'GM Hacker',
              body: 'Hack it until you make it!',
              icon: `${window.location.origin}/svg/logo.svg`,
              url: window.location.origin,
              type: '4ff69db6-5a68-4215-b739-101bfbf70473',
            },
          });
        }}>
        push
      </Button>

      <>
        <div>Messages: {JSON.stringify(messages)}</div>
      </> */}
      {children}
    </>
  );

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
}
