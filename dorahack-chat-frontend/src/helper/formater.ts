import { isEmpty } from 'lodash';
import { User } from '../type/auth';
import trimAddress from './trim-address';
import { QueryParams } from '../type/common';

export const nameFormat = (user?: User) => {
  if (isEmpty(user) || !user.publicAddress) {
    return '';
  }
  return trimAddress(user?.publicAddress);
};

export const queryParamsToString = (params: QueryParams) => {
  const keys = Object.keys(params);
  const stringParam = keys
    .map((key, i) => {
      const symbol = i === 0 ? '?' : '&';
      return `${symbol}${key}=${params[key]}`;
    })
    .join('');
  return stringParam;
};
