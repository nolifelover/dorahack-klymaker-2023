import { User } from './user.interface';

export enum ConversationType {
  DM = '1-1',
  GROUP = 'group',
  PAGE = 'page',
  NEGO = 'nego',
}

export interface Conversation {
  id: string;
  type: ConversationType;
  participants: [User];
  createdAt: Date;
  updatedAt: Date;
}
