import { PageInfo, Time } from './common';

export type CreateContactBody = {
  address: string;
  reason: string;
  description: string;
};

export type Contact = {
  reason: string;
  createdAt: Time;
  address: string;
  ownerUserId: string;
  description: string;
  id: string;
  updatedAt: Time;
};

export type ContactWithPageInfo = PageInfo & {
  results: Contact[];
};
