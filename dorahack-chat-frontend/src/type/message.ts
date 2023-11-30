import { Time, PageInfo } from './common';
import { Participant } from './conversation';

export type Message = {
  id: string;
  senderId: string;
  conversationId: string;
  content: string;
  contentType: MessageType;
  createdAt: Time;
  updatedAt: Time;
  optional: MessageStateOptional;
};

export type MessageWithPageInfo = PageInfo & {
  results: Message[];
};

export type MessageWithParticipant = {
  participants: Participant[];
  conversationMessages: MessageWithPageInfo;
};

export type MessageWithAlignAndSentStatus = Message & {
  sent: boolean;
  align: ChatBubbleAlign;
};

export enum MessageType {
  TEXT = 'txt',
  IMAGE = 'img',
  FILE = 'file',
}

export enum ChatBubbleAlign {
  Left = 'left',
  Right = 'right',
}

export type SendingMessageState = {
  content: string;
  type: MessageType | null;
  optional?: MessageStateOptional;
};

export type MessageStateOptional = {
  [key: string]: string | number | boolean;
};
