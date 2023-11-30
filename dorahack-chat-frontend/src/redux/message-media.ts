import { isEmpty, omit } from 'lodash';
import { queryParamsToString } from '../helper/formater';
import { getCoversationMediaApi } from '../rest-api/conversation';
import { PageInfo, PaginateParams } from '../type/common';
import { MessageType } from '../type/message';
import { MediaContent } from '../type/message-media';
import { initialPageInfoValue } from '../constant/page-info';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreDispatch, StoreGetState } from '.';
import { toast } from 'react-toastify';
import { errorFormat } from '../helper/error-format';

type PreviewPayload = {
  media: MediaContent[];
  pageInfo: PageInfo;
};

export type MessageMediaReducerState = {
  image: {
    media: MediaContent[];
    pageInfo: PageInfo;
    query: PaginateParams;
    loadingMore: boolean;
    initializing: boolean;
    success: boolean;
  };
  file: {
    media: MediaContent[];
    pageInfo: PageInfo;
    query: PaginateParams;
    loadingMore: boolean;
    initializing: boolean;
    success: boolean;
  };
  preview: {
    image: PreviewPayload;
    file: PreviewPayload;
    initializing: boolean;
    success: boolean;
  };
  error: boolean;
};

const initialState: MessageMediaReducerState = {
  image: {
    media: Array<MediaContent>(),
    pageInfo: initialPageInfoValue,
    query: {
      page: 1,
      limit: 30,
    },
    loadingMore: false,
    initializing: true,
    success: false,
  },
  file: {
    media: Array<MediaContent>(),
    pageInfo: initialPageInfoValue,
    query: {
      page: 1,
      limit: 30,
    },
    loadingMore: false,
    initializing: true,
    success: false,
  },
  preview: {
    image: {
      media: Array<MediaContent>(),
      pageInfo: initialPageInfoValue,
    },
    file: {
      media: Array<MediaContent>(),
      pageInfo: initialPageInfoValue,
    },
    initializing: false,
    success: false,
  },
  error: false,
};

const messageMediaSlice = createSlice({
  name: 'message-media',
  initialState,
  reducers: {
    // initialization
    initializingPreview: state => {
      state.preview.initializing = true;
      state.preview.success = false;
    },
    initializingImagePreview: state => {
      state.image.initializing = true;
      state.image.success = false;
    },
    initializingFilePreview: state => {
      state.file.initializing = true;
      state.file.success = false;
    },
    initializePreviewSuccess: (
      state,
      action: PayloadAction<{
        preview: {
          image: PreviewPayload;
          file: PreviewPayload;
        };
      }>
    ) => {
      state.preview.file = action.payload.preview.file;
      state.preview.image = action.payload.preview.image;
      state.preview.initializing = false;
      state.preview.success = true;
    },
    initializeImageSuccess: (
      state,
      action: PayloadAction<{
        media: MediaContent[];
        pageInfo: PageInfo;
      }>
    ) => {
      state.image.media = action.payload.media;
      state.image.pageInfo = action.payload.pageInfo;
      state.image.initializing = false;
    },
    initializeFileSuccess: (
      state,
      action: PayloadAction<{
        media: MediaContent[];
        pageInfo: PageInfo;
      }>
    ) => {
      state.file.media = action.payload.media;
      state.file.pageInfo = action.payload.pageInfo;
      state.file.initializing = false;
    },

    // other
    fetchMessageMediaFailure: () => {
      return {
        ...initialState,
        error: true,
      };
    },
    reset: () => initialState,
  },
});

const {
  initializingPreview,
  initializePreviewSuccess,
  initializingImagePreview,
  initializeImageSuccess,
  initializingFilePreview,
  initializeFileSuccess,
  fetchMessageMediaFailure,
} = messageMediaSlice.actions;

export const initializePreviewMedia =
  (conversationId: string) => async (dispatch: StoreDispatch) => {
    try {
      dispatch(initializingPreview());

      const imagePreviewParam = { page: 1, limit: 2 };
      const filePreviewParam = { page: 1, limit: 3 };

      const [imageResponse, fileResponse] = await Promise.all([
        fetchConversationsMedia(
          conversationId,
          MessageType.IMAGE,
          imagePreviewParam
        ),
        await fetchConversationsMedia(
          conversationId,
          MessageType.FILE,
          filePreviewParam
        ),
      ]);

      const preview = {
        image: {
          media: imageResponse.results,
          pageInfo: omit(imageResponse, ['results']),
        },
        file: {
          media: fileResponse.results,
          pageInfo: omit(fileResponse, ['results']),
        },
      };

      dispatch(initializePreviewSuccess({ preview }));
    } catch (error) {
      toast.error(errorFormat(error).message);
      dispatch(fetchMessageMediaFailure());
    }
  };

export const initializeImageMedia =
  () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
    try {
      const { selectedConversation } = getState().conversation;
      const { image } = getState().messageMedia;

      if (isEmpty(selectedConversation)) {
        throw new Error('Selected conversation not found.');
      }
      dispatch(initializingImagePreview());

      const imageResponse = await fetchConversationsMedia(
        selectedConversation.conversation.id,
        MessageType.IMAGE,
        image.query
      );

      dispatch(
        initializeImageSuccess({
          media: imageResponse.results,
          pageInfo: omit(imageResponse, ['results']),
        })
      );
    } catch (error) {
      toast.error(errorFormat(error).message);
      dispatch(fetchMessageMediaFailure());
    }
  };

export const initializeFileMedia =
  () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
    try {
      const { selectedConversation } = getState().conversation;
      const { file } = getState().messageMedia;

      if (isEmpty(selectedConversation)) {
        throw new Error('Selected conversation not found.');
      }
      dispatch(initializingFilePreview());

      const fileResponse = await fetchConversationsMedia(
        selectedConversation.conversation.id,
        MessageType.FILE,
        file.query
      );

      dispatch(
        initializeFileSuccess({
          media: fileResponse.results,
          pageInfo: omit(fileResponse, ['results']),
        })
      );
    } catch (error) {
      toast.error(errorFormat(error).message);
      dispatch(fetchMessageMediaFailure());
    }
  };

const fetchConversationsMedia = async (
  conversationId: string,
  contentType: MessageType,
  query: PaginateParams
) => {
  const queryParams = queryParamsToString({ ...query });
  const mediaResponse = await getCoversationMediaApi(
    conversationId,
    contentType,
    queryParams
  );
  if (isEmpty(mediaResponse)) {
    throw new Error('Media response is empty.');
  }
  return mediaResponse;
};

export default messageMediaSlice;
