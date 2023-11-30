import File from './File';
import UserProfile from './UserProfile';
import Media from './Media';
import { useSelector } from '../../../../redux';
import MediaPanel from './MediaPanel';
// import MuteToggle from './MuteToggle';
// import Encryption from './Encryption';
// import OtherMenu from './OtherMenu';

export default function ConversationDetailContainer() {
  const { conversationDetailPanel } = useSelector(state => state.layout);

  return (
    <div className="h-full border-l border-gray-200 overflow-auto">
      {conversationDetailPanel ? (
        <MediaPanel />
      ) : (
        <div className="px-3 pt-5 space-y-4 ">
          <UserProfile />
          <Media />
          <File />
          {/* 
            <MuteToggle />
            <Encryption />
            <OtherMenu /> 
          */}
        </div>
      )}
    </div>
  );
}
