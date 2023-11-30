import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../redux';
import { isEmpty } from 'lodash';
import { useDeepEffect } from '../../hook/useDeepEffect';
import { initializeMessage, receiveMessage } from '../../redux/message';
import { onChildChanged, ref } from 'firebase/database';
import { initializePreviewMedia } from '../../redux/message-media';
import { Message } from '../../type/message';
import ChatFeedContainer from '../../component/chat/chat-feed/ChatFeedContainer';
import { useState } from 'react';
import { requestConversationApi } from '../../rest-api/conversation';
import { toast } from 'react-toastify';
import { errorFormat } from '../../helper/error-format';
import FullSpinner from '../../component/@share/FullSpinner';
import UnauthorizedUserScheme from '../../component/unauthorized/UnauthorizedUserScheme';

export default function ChatWidget() {
  const dispatch = useDispatch();
  const { address: addressParam } = useParams();
  const [fetching, setFetching] = useState(true);
  const [conversationId, setConversationId] = useState('');
  const { userScheme, user } = useSelector(state => state.account);
  const { database } = useSelector(state => state.firebase);

  useDeepEffect(() => {
    (async () => {
      try {
        if (addressParam) {
          const convesation = await requestConversationApi([addressParam]);
          if (!convesation) {
            throw new Error('Convesation not found.');
          }
          setConversationId(convesation.id);
        }
      } catch (error) {
        toast.error(errorFormat(error).message);
      } finally {
        setFetching(false);
      }
    })();
  }, [addressParam]);

  useDeepEffect(() => {
    if (!conversationId || isEmpty(userScheme)) return;
    dispatch(initializeMessage(conversationId));
    dispatch(initializePreviewMedia(conversationId));
    if (!isEmpty(user) && !isEmpty(database)) {
      const conversationRef = ref(database, user.publicAddress);
      onChildChanged(conversationRef, snapshot => {
        if (snapshot.exists()) {
          const latestMessage = snapshot.val();
          if (!isEmpty(latestMessage)) {
            dispatch(receiveMessage(latestMessage as Message));
          }
        }
      });
    }
  }, [conversationId, user, database, userScheme]);

  if (!addressParam) {
    return <div></div>;
  }

  if (isEmpty(userScheme)) {
    return <UnauthorizedUserScheme />;
  }

  return (
    <div className="h-screen">
      {fetching ? <FullSpinner /> : <ChatFeedContainer />}
    </div>
  );
}
