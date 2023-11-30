import axios from '../helper/axios';
import environment from '../environment';
import { CommonAuthResponse } from '../type/auth';

export async function singInWithPublicAddressApi(
  publicAddress: string
): Promise<CommonAuthResponse | undefined> {
  const url = `${environment.apiUrl}/auth/signin/public-address`;
  const { data } = await axios.post(url, { publicAddress });
  return data;
}

export async function authWithSignMessageApi(
  publicAddress: string,
  signature: string
): Promise<CommonAuthResponse | undefined> {
  const url = `${environment.apiUrl}/auth/using/public-address`;
  const { data } = await axios.post(url, { publicAddress, signature });
  return data;
}
