import Conversation from './Conversation';
import Header from './Header';
import Input from './Input';

export default function FeedContainer() {
  return (
    <div className="justify-between flex flex-col h-full">
      <div className="min-h-[55px]">
        <Header />
      </div>
      <div className="h-full overflow-y-auto">
        <Conversation />
      </div>
      <Input />
    </div>
  );
}
