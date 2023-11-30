import { PropsWithChildren, useState } from 'react';
import { useDeepEffect } from '../hook/useDeepEffect';
import { errorFormat } from '../helper/error-format';
import {
  authWithSignMessageApi,
  singInWithPublicAddressApi,
} from '../rest-api/authentication';
import { AuthRespData, SinginRespData } from '../type/auth';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';
import FullSpinner from '../component/@share/FullSpinner';
import { getUserInfoApi } from '../rest-api/user';
import { useDispatch } from '../redux';
import { disconnectWallet, initializeUserSuccess } from '../redux/account';
import {
  getCredentialTokens,
  setCredentialTokens,
} from '../helper/local-storage';

export default function AccountPortal({ children }: PropsWithChildren) {
  const { address } = useAccount();
  const dispatch = useDispatch();

  const { signMessageAsync } = useSignMessage();
  const { disconnect, isLoading: disconnecting } = useDisconnect();
  const [userInitializing, setUserInitializing] = useState(true);
  const [signingMessage, setSigningMessage] = useState(true);

  useDeepEffect(() => {
    (async () => {
      if (address && !getCredentialTokens()) {
        await signMessageWithMessage();
      }
      if (address && getCredentialTokens()) {
        await setUserInfo();
      }
      setUserInitializing(false);
      setSigningMessage(false);
    })();
  }, [address]);

  const signMessageWithMessage = async () => {
    try {
      setSigningMessage(true);
      const respSingin = await singInWithPublicAddressApi(address!);
      if (respSingin?.status != 200) {
        throw respSingin?.message;
      }
      const singinResp = respSingin.data as SinginRespData;
      const signMessageData = await signMessageAsync({
        message: singinResp.msg,
      });
      const respAuth = await authWithSignMessageApi(address!, signMessageData!);
      if (respAuth?.status != 200) {
        throw respAuth?.message;
      }
      const authData = respAuth.data as AuthRespData;
      dispatch(initializeUserSuccess({ user: authData.user }));
      setCredentialTokens(authData.tokens);
    } catch (error) {
      handleDisconnect();
      toast.error(errorFormat(error).message);
    }
  };

  const setUserInfo = async () => {
    try {
      setUserInitializing(true);
      const storageToken = getCredentialTokens();
      if (!storageToken) {
        return handleDisconnect();
      }
      setCredentialTokens(storageToken);
      const userInfo = await getUserInfoApi();
      if (!userInfo) {
        throw 'user not found';
      }
      dispatch(initializeUserSuccess({ user: userInfo }));
    } catch (error) {
      handleDisconnect();
      toast.error(errorFormat(error).message);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    dispatch(disconnectWallet());
  };

  if (userInitializing || signingMessage || disconnecting) {
    return <FullSpinner />;
  }

  return <>{children}</>;
}
