import { User } from '../type/auth';
import { Participant } from '../type/conversation';

export const getReceiver = (participants: Participant[], user: User) => {
  const receiver = participants.find(
    par => par.publicAddress !== user?.publicAddress
  );

  return receiver;
};
