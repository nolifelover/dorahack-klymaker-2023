import { NestHttpException, Time } from './common';

export type CommonAuthResponse = {
  status: number;
  message: string;
  data: SinginRespData | AuthRespData | NestHttpException | null;
};

export type SinginRespData = {
  nonce: number;
  msg: string;
};

export type AuthRespData = {
  user: User;
  tokens: JwtToken;
};

export type JwtToken = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: string;
  publicAddress: string;
  createdAt: Time;
  updatedAt: Time;
  role: UserRole;
  nonce: number;
  lensId: string;
};

export type UserRole = 'GUEST' | 'ADMIN' | 'USER';
