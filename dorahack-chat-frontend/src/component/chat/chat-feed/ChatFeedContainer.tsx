import { ChatMenuTab } from '../../../type/conversation';
import AddContactForm from './other/AddContactForm';
import ContactDetail from './other/ContactDetail';
import NoSelectedLanding from './other/NoSelectedLanding';
import DetailContainer from './conversation-detail/DetailContainer';
import FeedContainer from './conversation-feed/FeedContainer';
import classNames from 'classnames';
import FetchingLanding from './other/FetchingLanding';
import { isEmpty } from 'lodash';
import { useSelector } from '../../../redux';

export default function Container() {
  const { selectedContact, selectedContactInitialzing } = useSelector(
    state => state.contact
  );
  const { isWidget } = useSelector(state => state.layout);
  const { isShowConversationDetail } = useSelector(state => state.layout);
  const { initialzing: messageInitialzing, participants: messageParticipants } =
    useSelector(state => state.message);

  const isSelectedConversation = !!messageParticipants.length;

  const { isShowAddContact, activeChatMenuTab } = useSelector(
    state => state.layout
  );

  if (messageInitialzing || selectedContactInitialzing) {
    return <FetchingLanding />;
  }

  if (isShowAddContact) {
    return <AddContactForm />;
  }

  if (activeChatMenuTab === ChatMenuTab.Chats && !isSelectedConversation) {
    return (
      <NoSelectedLanding
        title="No chat selected"
        description="Select the chat room from left navigation bar to start a conversation."
      />
    );
  }

  // if (activeChatMenuTab === ChatMenuTab.Disputes && !isSelectedConversation) {
  //   return (
  //     <NoContactSelected
  //       title="No dispute selected"
  //       description="Select the dispute room from left navigation bar to view dispute information."
  //     />
  //   );
  // }

  if (activeChatMenuTab === ChatMenuTab.Contacts && isEmpty(selectedContact)) {
    return (
      <NoSelectedLanding
        title="No contact selected"
        description="Select the contact from left navigation bar to view the contact’s information."
      />
    );
  }

  if (activeChatMenuTab === ChatMenuTab.Contacts && !isEmpty(selectedContact)) {
    return <ContactDetail selectedContact={selectedContact} />;
  }

  return (
    <div className="h-full overflow-hidden">
      <div
        className={classNames('h-full', {
          'pr-72': isShowConversationDetail && !isWidget,
        })}>
        <FeedContainer />
      </div>
      {!isWidget && isShowConversationDetail && (
        <div
          className={classNames('fixed top-0 right-0 z-40 pt-16 h-full', {
            'w-72': isShowConversationDetail,
          })}>
          <DetailContainer />
        </div>
      )}
    </div>
  );
}
