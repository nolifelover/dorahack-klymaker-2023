export enum ConversationMessageType {
  TEXT = 'txt',
  IMAGE = 'img',
  FILE = 'file',
}

export interface ConversationMessage {
  id: string;
  senderId: string;
  conversationId: string;
  content: string;
  contentType: ConversationMessageType;
  optional?: object;
  createdAt: Date;
  updatedAt: Date;
}
