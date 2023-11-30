import moment from 'moment';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import trimAddress from '../../../helper/trim-address';
import classnames from 'classnames';
import PlaceholderAvatar from '../../@share/PlaceholderAvatar';
import { Conversation } from '../../../type/conversation';
import { isEmpty } from 'lodash';
import { getReceiver } from '../../../helper/conversation';
import { toggleIsShowAddContact } from '../../../redux/layout';
import { useDispatch, useSelector } from '../../../redux';
import { MessageType } from '../../../type/message';
import { setSelectedConversation } from '../../../redux/conversation';
import { setDefaultMessageState } from '../../../redux/message';

type Props = {
  conversation: Conversation;
};

export default function ConversationCard({ conversation }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: conversationIdParam } = useParams();
  const { activeChatMenuTab } = useSelector(state => state.layout);
  const { user } = useSelector(state => state.account);

  const { participants, latestMessage } = conversation;
  const receiver = getReceiver(participants, user!);

  const displayTitle = () => {
    switch (conversation.type) {
      default: {
        return !isEmpty(receiver)
          ? trimAddress(receiver.publicAddress)
          : 'Unknown';
      }
    }
  };

  const displayMessgae = () => {
    switch (latestMessage?.contentType) {
      case MessageType.FILE: {
        return latestMessage?.content
          ? `Encrypted File ${trimAddress(latestMessage?.content)}`
          : '...';
      }
      case MessageType.IMAGE: {
        return latestMessage?.content
          ? `Encrypted Image ${trimAddress(latestMessage?.content)}`
          : '...';
      }
      default: {
        return latestMessage?.content
          ? `Encrypted Message ${trimAddress(latestMessage?.content)}`
          : '...';
      }
    }
  };

  // const onlineIndicator = () => {
  //   return conversation?.online ? (
  //     <span className="top-0 -right-1 absolute w-[12px] h-[12px] bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
  //   ) : (
  //     <></>
  //   );
  // };

  // const displayBadge = () => {
  //   if (!chat.unread) {
  //     return null;
  //   }
  //   return (
  //     <span className="inline-flex justify-center items-center w-4 h-4 text-xs font-semibold rounded-full text-primary-800 bg-primary-100 dark:bg-primary-200 dark:text-primary-800">
  //       {chat.unread}
  //     </span>
  //   );
  // };

  const displayTime = () => {
    const updatedAt = conversation.updatedAt._seconds;
    return moment(updatedAt * 1000).fromNow(true);
  };

  const onClickCard = (conversation: Conversation) => {
    dispatch(toggleIsShowAddContact(false));
    dispatch(setSelectedConversation({ selectedConversation: null }));
    dispatch(setDefaultMessageState());
    navigate(`/${activeChatMenuTab}/${conversation.id}`);
  };

  if (!receiver) {
    return <></>;
  }

  return (
    <div
      onClick={() => onClickCard(conversation)}
      className={classnames(
        'flex pt-2 pb-3 px-3 items-center overflow-hidden relative cursor-pointer hover:bg-gray-100 rounded',
        {
          'bg-gray-100': conversationIdParam === conversation.id,
        }
      )}>
      <div className="relative flex justify-center w-[36px] h-[36px]">
        <PlaceholderAvatar publicAddress={receiver.publicAddress} />
        {/* {onlineIndicator()} */}
      </div>
      <div className="font-normal w-full pl-2">
        <div className="text-sm">{displayTitle()}</div>
        <div className="flex justify-between">
          <div
            className={classNames(
              'text-sm text-gray-500 truncate w-48'
              // {'font-bold text-black': !!chat.unread,}
            )}>
            {displayMessgae()}
          </div>
          {/* {displayBadge()} */}
        </div>
      </div>
      <div className="text-xs top-3 right-3 absolute text-gray-600">
        {displayTime()}
      </div>
    </div>
  );
}
