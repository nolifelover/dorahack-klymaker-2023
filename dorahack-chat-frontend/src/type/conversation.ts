import { PageInfo, Time } from './common';
import { Message } from './message';

export type Conversation = {
  createdAt: Time;
  id: string;
  latestMessage?: Message;
  type: ConversationType;
  participants: Participant[];
  updatedAt: Time;
};

export type Participant = {
  createdAt: Time;
  role: string;
  publicAddress: string;
  id: string;
  nonce: number;
  updatedAt: Time;
};

export type ConversationWithParticipants = {
  conversation: Conversation;
  participants: Participant[];
};

export type ConversationWithPageInfo = PageInfo & {
  results: Conversation[];
};

export enum ConversationType {
  DM = '1-1',
  GROUP = 'group',
}

export type ConversationState = {
  conversations: Conversation[];
  pageInfo: PageInfo;
};

export enum ChatMenuTab {
  Chats = 'chats',
  // Disputes: 'disputes',
  Contacts = 'contacts',
}

export enum MediaPanel {
  Media = 'media',
  // Disputes: 'disputes',
  File = 'file',
}
