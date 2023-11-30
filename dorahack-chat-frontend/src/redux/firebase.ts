import { Database } from 'firebase/database';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FirebaseReducerState = {
  database: Database | null;
  error: boolean;
};

const initialState: FirebaseReducerState = {
  database: null,
  error: false,
};

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    initializeDatabaseSuccess: (
      state,
      action: PayloadAction<{
        database: Database;
      }>
    ) => ({
      ...state,
      database: action.payload.database,
    }),
    initializeFirebaseFailure: () => ({
      database: null,
      storage: null,
      error: true,
    }),
    resetFirebaseState: () => initialState,
  },
});

export const {
  initializeDatabaseSuccess,
  initializeFirebaseFailure,
  resetFirebaseState,
} = firebaseSlice.actions;

export default firebaseSlice;
