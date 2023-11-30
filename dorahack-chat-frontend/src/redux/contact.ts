import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { StoreDispatch, StoreGetState } from '.';
import { initialPageInfoValue } from '../constant/page-info';
import { PageInfo, PaginateParams } from '../type/common';
import { queryParamsToString } from '../helper/formater';
import { errorFormat } from '../helper/error-format';
import { Contact } from '../type/contact';
import { getContactApi, getContactsApi } from '../rest-api/contact';
import { isArray, isEmpty, omit } from 'lodash';
import sleep from '../helper/sleep';

export type ContactReducerState = {
  contacts: Contact[];
  pageInfo: PageInfo;
  query: PaginateParams;
  initialzing: boolean;
  loadingMore: boolean;
  backgroundUpdating: boolean;
  error: boolean;
  selectedContact: Contact | null;
  selectedContactInitialzing: boolean;
};

const initialState: ContactReducerState = {
  contacts: Array<Contact>(),
  pageInfo: initialPageInfoValue,
  query: {
    page: 1,
    limit: 15,
  },
  initialzing: true,
  loadingMore: false,
  backgroundUpdating: false,
  error: false,
  selectedContact: null,
  selectedContactInitialzing: false,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    // initialization
    initializeContactSuccess: (
      state,
      action: PayloadAction<{
        contacts: Contact[];
        pageInfo: PageInfo;
      }>
    ) => {
      state.contacts = action.payload.contacts;
      state.pageInfo = action.payload.pageInfo;
      state.initialzing = false;
    },
    // background update
    backgroundUpdatingContact: state => {
      state.backgroundUpdating = true;
    },
    backgroundUpdateContactSuccess: (
      state,
      action: PayloadAction<{
        contacts: Contact[];
        pageInfo: PageInfo;
      }>
    ) => {
      state.contacts = action.payload.contacts;
      state.pageInfo = action.payload.pageInfo;
      state.backgroundUpdating = false;
    },
    // selected contact
    initializingSelectedContact: state => {
      state.selectedContactInitialzing = true;
    },
    setSeletedContactSuccess: (
      state,
      action: PayloadAction<{
        contact: Contact | null;
      }>
    ) => {
      state.selectedContact = action.payload.contact;
      state.selectedContactInitialzing = false;
    },
    // other
    fetchContactFailure: () => {
      return { ...initialState, initialzing: false, error: true };
    },
    reset: () => initialState,
  },
});

const {
  initializeContactSuccess,
  backgroundUpdatingContact,
  backgroundUpdateContactSuccess,
  fetchContactFailure,
  initializingSelectedContact,
  setSeletedContactSuccess,
  reset,
} = contactSlice.actions;

export const setDefaultContactState = reset;

export const initializeContact =
  () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
    try {
      const { query } = getState().contact;
      const contactResponse = await fetchContacts(query);
      dispatch(
        initializeContactSuccess({
          contacts: contactResponse.results,
          pageInfo: omit(contactResponse, ['results']),
        })
      );
    } catch (error) {
      toast.error(errorFormat(error).message);
      dispatch(fetchContactFailure());
    }
  };

export const backgroundUpdateContact =
  () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
    try {
      dispatch(backgroundUpdatingContact());
      const { query } = getState().contact;
      const contactResponse = await fetchContacts(query);
      dispatch(
        backgroundUpdateContactSuccess({
          contacts: contactResponse.results,
          pageInfo: omit(contactResponse, ['results']),
        })
      );
    } catch (error) {
      toast.error(errorFormat(error).message);
      dispatch(fetchContactFailure());
    }
  };

export const initializeSelectedContact =
  (contactId: string | null) => async (dispatch: StoreDispatch) => {
    try {
      if (!contactId) {
        return dispatch(setSeletedContactSuccess({ contact: null }));
      }
      dispatch(initializingSelectedContact());
      const contactResponse = await fetchContactById(contactId);
      await sleep(500);
      dispatch(setSeletedContactSuccess({ contact: contactResponse }));
    } catch (error) {
      toast.error(errorFormat(error).message);
      dispatch(fetchContactFailure());
    }
  };

// Private
const fetchContacts = async (query: PaginateParams) => {
  const queryParam = queryParamsToString({ ...query });
  const contactResponse = await getContactsApi(queryParam);
  if (isEmpty(contactResponse)) {
    throw new Error('Contact response is empty.');
  }
  if (!isArray(contactResponse.results)) {
    throw new Error('Contact is not found.');
  }
  return contactResponse;
};

const fetchContactById = async (contactId: string) => {
  const contactResponse = await getContactApi(contactId!);
  if (isEmpty(contactResponse)) {
    throw new Error('Contact response is empty.');
  }
  return contactResponse;
};

export default contactSlice;
