import { useState } from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import PlaceholderAvatar from '../../../@share/PlaceholderAvatar';
import { getReceiver } from '../../../../helper/conversation';
import { useDeepEffect } from '../../../../hook/useDeepEffect';
import { isEmpty } from 'lodash';
import { Participant } from '../../../../type/conversation';
import { useDispatch, useSelector } from '../../../../redux';
import { toggleIsShowConversationDetail } from '../../../../redux/layout';
import trimAddress from '../../../../helper/trim-address';

export default function ConversationHeader() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.account);
  const { participants } = useSelector(state => state.message);
  const { isShowConversationDetail } = useSelector(state => state.layout);
  const [receiverInfo, setReceiverInfo] = useState<Participant | undefined>();
  const { isWidget } = useSelector(state => state.layout);

  useDeepEffect(() => {
    if (!isEmpty(user) && participants.length) {
      const receiver = getReceiver(participants, user);
      if (!isEmpty(receiver)) {
        setReceiverInfo(receiver);
      }
    }
  }, [participants, user]);

  if (!receiverInfo) {
    return <></>;
  }

  return (
    <div className="flex justify-between items-center h-full bg-white w-full px-3 border-b-2 border-gray-200">
      <div className="flex items-center space-x-2">
        <PlaceholderAvatar publicAddress={receiverInfo.publicAddress} />
        <div className="flex flex-col leading-tight">
          <span className="text-gray-900">
            {trimAddress(receiverInfo.publicAddress)}
          </span>
          {/* <div className="flex items-center space-x-1">
            <div className="w-[10px] h-[10px] bg-green-500 rounded-full" />
            <span className="text-xs text-green-500">Online</span>
          </div> */}
        </div>
      </div>
      {!isWidget && (
        <div
          className="cursor-pointer"
          onClick={() =>
            dispatch(toggleIsShowConversationDetail(!isShowConversationDetail))
          }>
          <AiOutlineMore />
        </div>
      )}
    </div>
  );
}
