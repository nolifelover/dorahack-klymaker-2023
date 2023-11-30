import classNames from 'classnames';
import ChatFeedContainer from '../../component/chat/chat-feed/ChatFeedContainer';
import MenuContainer from '../../component/chat/chat-menu/MenuContainer';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from '../../redux';
import { useDeepEffect } from '../../hook/useDeepEffect';
import { initializeConversation } from '../../redux/conversation';
import {
  initializeContact,
  initializeSelectedContact,
} from '../../redux/contact';
import { ChatMenuTab } from '../../type/conversation';
import { useLocation, useParams } from 'react-router-dom';
import { setActiveChatMenuTab } from '../../redux/layout';
import { initializeMessage, receiveMessage } from '../../redux/message';
import { onChildChanged, ref } from 'firebase/database';
import { Message } from '../../type/message';
import { initializePreviewMedia } from '../../redux/message-media';
import UnauthorizedUserScheme from '../../component/unauthorized/UnauthorizedUserScheme';

export default function ChatFeed() {
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector(state => state.layout);
  const { userScheme, user } = useSelector(state => state.account);
  const { database } = useSelector(state => state.firebase);
  const location = useLocation();
  const { tab: tabParam, id: idParam } = useParams();

  useDeepEffect(() => {
    if (!isEmpty(userScheme)) {
      dispatch(initializeConversation());
      dispatch(initializeContact());
    }
  }, [userScheme]);

  useDeepEffect(() => {
    const tab = tabParam as ChatMenuTab | undefined;
    if (!tab) {
      dispatch(setActiveChatMenuTab(ChatMenuTab.Chats));
    } else {
      const allTabs = Object.values(ChatMenuTab);
      dispatch(
        setActiveChatMenuTab(allTabs.includes(tab) ? tab : ChatMenuTab.Chats)
      );
    }
  }, [tabParam, location.pathname]);

  useDeepEffect(() => {
    if (!idParam || isEmpty(userScheme)) return;

    if (tabParam === ChatMenuTab.Contacts) {
      dispatch(initializeSelectedContact(idParam));
    }

    if (tabParam === ChatMenuTab.Chats) {
      dispatch(initializeMessage(idParam));
      dispatch(initializePreviewMedia(idParam));

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
    }
  }, [tabParam, idParam, location.pathname, user, database, userScheme]);

  if (isEmpty(userScheme)) {
    return <UnauthorizedUserScheme />;
  }

  return (
    <>
      <MenuContainer />
      <div
        className={classNames(
          'overflow-y-auto relative w-full h-full bg-white dark:bg-gray-900',
          isOpenSidebar ? 'lg:ml-80' : 'lg:ml-0'
        )}>
        <div className="h-full">
          <ChatFeedContainer />
        </div>
      </div>
    </>
  );
}
