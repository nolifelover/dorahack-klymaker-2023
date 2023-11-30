import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { omit, isEmpty, isArray } from 'lodash';
import { StoreDispatch, StoreGetState } from '.';
import { initialPageInfoValue } from '../constant/page-info';
import { PageInfo, PaginateParams } from '../type/common';
import { queryParamsToString } from '../helper/formater';
import { errorFormat } from '../helper/error-format';
import {
  Conversation,
  ConversationWithParticipants,
} from '../type/conversation';
import { getConversationsApi } from '../rest-api/conversation';

export type ConversationReducerState = {
  conversations: Conversation[];
  pageInfo: PageInfo;
  query: PaginateParams;
  initialzing: boolean;
  loadingMore: boolean;
  backgroundUpdating: boolean;
  error: boolean;
  selectedConversation: ConversationWithParticipants | null;
};

const initialState: ConversationReducerState = {
  conversations: Array<Conversation>(),
  pageInfo: initialPageInfoValue,
  query: {
    page: 1,
    limit: 15,
  },
  initialzing: true,
  loadingMore: false,
  backgroundUpdating: false,
  error: false,
  selectedConversation: null,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    // initialization
    initializeConversationSuccess: (
      state,
      action: PayloadAction<{
        conversations: Conversation[];
        pageInfo: PageInfo;
      }>
    ) => {
      state.conversations = action.payload.conversations;
      state.pageInfo = action.payload.pageInfo;
      state.initialzing = false;
    },
    setSelectedConversation: (
      state,
      action: PayloadAction<{
        selectedConversation: ConversationWithParticipants | null;
      }>
    ) => ({
      ...state,
      selectedConversation: action.payload.selectedConversation,
    }),
    // background update
    backgroundUpdatingConversation: state => {
      state.backgroundUpdating = true;
    },
    backgroundUpdateConversationSuccess: (
      state,
      action: PayloadAction<{
        conversations: Conversation[];
        pageInfo: PageInfo;
      }>
    ) => {
      state.conversations = action.payload.conversations;
      state.pageInfo = action.payload.pageInfo;
      state.backgroundUpdating = false;
    },
    // other
    fetchConversationFailure: () => {
      return { ...initialState, initialzing: false, error: true };
    },
    reset: () => initialState,
  },
});

export const {
  initializeConversationSuccess,
  setSelectedConversation,
  backgroundUpdatingConversation,
  backgroundUpdateConversationSuccess,
  fetchConversationFailure,
} = conversationSlice.actions;

export const initializeConversation =
  () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
    try {
      const { query } = getState().conversation;
      const conversationResponse = await fetchConversations(query);
      dispatch(
        initializeConversationSuccess({
          conversations: conversationResponse.results,
          pageInfo: omit(conversationResponse, ['results']),
        })
      );
    } catch (error) {
      toast.error(errorFormat(error).message);
      dispatch(fetchConversationFailure());
    }
  };

export const backgroundUpdateConversation =
  () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
    try {
      dispatch(backgroundUpdatingConversation());
      const { query } = getState().conversation;
      const conversationResponse = await fetchConversations(query);
      dispatch(
        backgroundUpdateConversationSuccess({
          conversations: conversationResponse.results,
          pageInfo: omit(conversationResponse, ['results']),
        })
      );
    } catch (error) {
      toast.error(errorFormat(error).message);
      dispatch(fetchConversationFailure());
    }
  };

// Private
const fetchConversations = async (query: PaginateParams) => {
  const queryParams = queryParamsToString({ ...query });
  const conversationResponse = await getConversationsApi(queryParams);
  if (isEmpty(conversationResponse)) {
    throw new Error('Conversation response is empty.');
  }
  if (!isArray(conversationResponse.results)) {
    throw new Error('Conversations is not found.');
  }
  return conversationResponse;
};

export default conversationSlice;
