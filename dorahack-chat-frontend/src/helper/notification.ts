import environment from '../environment';

const walletconnectProjectId = environment.walletconnectProjectId;
const web3InboxSecret = environment.web3InboxSecret;

export interface NotificationPayload {
  title: string;
  body: string;
  icon: string;
  url: string;
  type: string; // 4ff69db6-5a68-4215-b739-101bfbf70473
}

export const notifyWalletconnect = async (notificationPayload: {
  accounts: string[];
  notification: NotificationPayload;
}) => {
  const result = await fetch(
    `https://notify.walletconnect.com/${walletconnectProjectId}/notify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${web3InboxSecret}`,
      },
      body: JSON.stringify(notificationPayload),
    }
  );

  const gmRes = await result.json();

  return gmRes;
};
