import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatMenuTab, MediaPanel } from '../type/conversation';

export type LayoutReducerState = {
  isOpenSidebar: boolean;
  isShowLoader: boolean;
  isShowAddContact: boolean;
  activeChatMenuTab: ChatMenuTab;
  isShowConversationDetail: boolean;
  conversationDetailPanel: MediaPanel | null;
  lightBoxPortal: string;
  isWidget: boolean;
};

const initialState: LayoutReducerState = {
  isOpenSidebar: true,
  isShowLoader: false,
  isShowAddContact: false,
  activeChatMenuTab: ChatMenuTab.Chats,
  isShowConversationDetail: true,
  conversationDetailPanel: null,
  lightBoxPortal: '',
  isWidget: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleIsOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSidebar = action.payload;
    },
    toggleIsShowLoader: (state, action: PayloadAction<boolean>) => {
      state.isOpenSidebar = action.payload;
    },
    toggleIsShowAddContact: (state, action: PayloadAction<boolean>) => {
      state.isShowAddContact = action.payload;
    },
    toggleIsShowConversationDetail: (state, action: PayloadAction<boolean>) => {
      state.isShowConversationDetail = action.payload;
    },
    setActiveChatMenuTab: (state, action: PayloadAction<ChatMenuTab>) => {
      state.activeChatMenuTab = action.payload;
    },
    setConversationDetailPanel: (
      state,
      action: PayloadAction<MediaPanel | null>
    ) => {
      state.conversationDetailPanel = action.payload;
    },
    setLightBoxPortal: (state, action: PayloadAction<string>) => {
      state.lightBoxPortal = action.payload;
    },
    setIsWidget: (state, action: PayloadAction<boolean>) => {
      state.isWidget = action.payload;
    },
  },
});

export const {
  toggleIsOpenSidebar,
  toggleIsShowLoader,
  toggleIsShowAddContact,
  setActiveChatMenuTab,
  toggleIsShowConversationDetail,
  setConversationDetailPanel,
  setLightBoxPortal,
  setIsWidget,
} = layoutSlice.actions;
export default layoutSlice;
