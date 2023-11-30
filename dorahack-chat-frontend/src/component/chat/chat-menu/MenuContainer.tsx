import classNames from 'classnames';
import MenuTabs from './MenuTabs';
import SearchForm from './SearchForm';
import Conversations from './Conversations';
import { ChatMenuTab } from '../../../type/conversation';
import { FC } from 'react';
import Contacts from './Contacts';
import { useSelector } from '../../../redux';

export default function MenuContainer() {
  const { isOpenSidebar } = useSelector(state => state.layout);
  const { conversations, initialzing: conversationInitialzing } = useSelector(
    state => state.conversation
  );
  const { contacts, initialzing: contactInitialzing } = useSelector(
    state => state.contact
  );
  const { activeChatMenuTab } = useSelector(state => state.layout);

  const DisplayTab: FC = () => {
    switch (activeChatMenuTab) {
      case ChatMenuTab.Chats: {
        return <ChatsTab />;
      }
      // case ChatMenuTab.Disputes: {
      //   return <DisputesTab />;
      // }
      case ChatMenuTab.Contacts: {
        return <ContactsTab />;
      }
    }
  };

  const ChatsTab: FC = () => {
    return (
      <>
        <Conversations
          title="Conversations"
          conversations={conversations}
          loading={conversationInitialzing}
        />
        {/* <Conversations
          title="Group Conversations"
          conversations={groupConversations}
        /> */}
      </>
    );
  };

  // const DisputesTab: FC = () => {
  //   return (
  //     <>
  //       {/* <Conversations
  //       title="Dispute Conversations"
  //       conversations={conversations}
  //     /> */}
  //     </>
  //   );
  // };

  const ContactsTab: FC = () => {
    return <Contacts contacts={contacts} loading={contactInitialzing} />;
  };

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 z-40 pt-16',
        'w-80 h-screen',
        'bg-white border-r border-gray-200',
        'md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 block',
        {
          'opacity-0': !isOpenSidebar,
        }
      )}>
      <div className="overflow-hidden h-full pt-2 bg-white dark:bg-gray-800 flex flex-col space-y-4">
        <MenuTabs />
        <SearchForm />
        <div className="overflow-y-auto flex flex-col space-y-6">
          <DisplayTab />
        </div>
      </div>
    </div>
  );
}
