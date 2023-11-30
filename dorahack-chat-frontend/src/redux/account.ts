import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CryptoECIES } from '../helper/crypto';
import { User } from '../type/auth';
import { StoreDispatch } from '.';
import { setCredentialTokens } from '../helper/local-storage';

export type AccountReducerState = {
  user: User | null;
  userScheme: CryptoECIES | null;
  error: boolean;
};

const initialState: AccountReducerState = {
  user: null,
  userScheme: null,
  error: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    initializeUserSuccess: (
      state,
      action: PayloadAction<{
        user: User;
      }>
    ) => ({
      ...state,
      user: action.payload.user,
    }),
    initializeUserSchemeSuccess: (
      state,
      action: PayloadAction<{
        userScheme: CryptoECIES;
      }>
    ) => ({
      ...state,
      userScheme: action.payload.userScheme,
    }),
    initializeAccountFailure: () => ({
      user: null,
      userScheme: null,
      error: true,
    }),
    resetAccountState: () => initialState,
  },
});

export const disconnectWallet = () => (dispatch: StoreDispatch) => {
  setCredentialTokens(null);
  dispatch(resetAccountState());
};

export const {
  initializeUserSuccess,
  initializeUserSchemeSuccess,
  initializeAccountFailure,
  resetAccountState,
} = accountSlice.actions;
export default accountSlice;
