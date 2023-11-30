import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Contract } from 'ethers';

export type ContractReducerState = {
  contract: Contract | null;
  error: boolean;
};

const initialState: ContractReducerState = {
  contract: null,
  error: false,
};

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    initializeContractSuccess: (
      state,
      action: PayloadAction<{
        contract: Contract;
      }>
    ) => ({
      ...state,
      contract: action.payload.contract,
    }),
    initializeContractFailure: () => ({ contract: null, error: true }),
    resetContractState: () => initialState,
  },
});

export const {
  initializeContractSuccess,
  initializeContractFailure,
  resetContractState,
} = contractSlice.actions;

export default contractSlice;
