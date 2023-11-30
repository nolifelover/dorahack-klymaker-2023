import { isArray } from 'lodash';
import ConversationCard from './ConversationCard';
import EmptyChat from './EmptyChat';
import { Conversation } from '../../../type/conversation';
import ConversationsSkeleton from '../../@skeleton/ConversationsSkeleton';
import { toggleIsShowAddContact } from '../../../redux/layout';
import { useDispatch } from '../../../redux';

type Props = {
  title: string;
  conversations: Conversation[];
  loading: boolean;
};

export default function Conversations({
  title,
  conversations,
  loading,
}: Props) {
  const dispatch = useDispatch();

  if (loading) {
    return <ConversationsSkeleton />;
  }

  return (
    <div className="border-b-2 pb-4">
      <div className="px-2">
        <div className="flex items-center justify-between text-gray-500 text-base font-normal pb-1 px-1">
          <div>{title}</div>
          <div
            className="cursor-pointer hover:text-gray-600"
            onClick={() => dispatch(toggleIsShowAddContact(true))}>
            +
          </div>
        </div>
        {!conversations.length && <EmptyChat />}
        {isArray(conversations) &&
          conversations.map(conv => (
            <ConversationCard key={conv.id} conversation={conv} />
          ))}
      </div>
    </div>
  );
}
