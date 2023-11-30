import trimAddress from '../../../../helper/trim-address.ts';
import { useSelector } from '../../../../redux/index.ts';
import { GoCopy } from 'react-icons/go';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PlaceholderAvatar from '../../../@share/PlaceholderAvatar.tsx';
import { isEmpty } from 'lodash';
import { getReceiver } from '../../../../helper/conversation.ts';

export default function UserProfile() {
  const { user } = useSelector(state => state.account);
  const { selectedConversation } = useSelector(state => state.conversation);

  if (isEmpty(selectedConversation) || isEmpty(user)) {
    return null;
  }

  const { participants } = selectedConversation;
  const receiver = getReceiver(participants, user);

  if (isEmpty(receiver)) {
    return null;
  }

  return (
    <div className="items-center self-stretch flex flex-col">
      <div className="aspect-square object-cover object-center w-20 overflow-hidden self-center max-w-full">
        <PlaceholderAvatar publicAddress={receiver.publicAddress} size={80} />
      </div>
      <div className="items-center self-stretch flex grow flex-col mt-2 px-5">
        <div className="self-stretch text-gray-900 text-center text-xl font-bold leading-[125%] max-w-[312px] truncate">
          {receiver?.publicAddress}
        </div>
        <div className="self-center flex items-center w-[117px] max-w-full gap-2">
          <div className="text-gray-400 text-sm leading-[150%] self-stretch">
            {trimAddress(receiver?.publicAddress)}
          </div>
          <CopyToClipboard text={receiver.publicAddress}>
            <GoCopy className="w-16px h-16px text-gray-500 cursor-pointer" />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
