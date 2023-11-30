/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  LensClient,
  development,
  IStorageProvider,
} from '@lens-protocol/client';

class LocalStorageProvider implements IStorageProvider {
  getItem(key: string) {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}

const lensClient = new LensClient({
  environment: development,
  storage: new LocalStorageProvider(),
});

export const createLensProfile = async (address: string, handle: string) => {
  const profileCreateResult: any = await lensClient.profile.create({
    handle: handle,
    to: address,
  });

  if (!profileCreateResult?.txId) {
    throw new Error(profileCreateResult.reason);
  }

  await lensClient.transaction.waitUntilComplete({
    forTxId: profileCreateResult.txId,
  });

  const allOwnedProfiles = await lensClient.profile.fetchAll({
    where: {
      ownedBy: [address],
    },
  });

  return allOwnedProfiles;
};

export const getLensProfile = async (lensId: string) => {
  const profileById = await lensClient.profile.fetch({
    forProfileId: lensId,
  });

  return profileById;
};

export default lensClient;
