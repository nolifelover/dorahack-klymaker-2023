import { isEmpty } from 'lodash';
import ChatBubble from './ChatBubble';
import { useRef } from 'react';
import { useDeepEffect } from '../../../../hook/useDeepEffect';
import { useSelector } from '../../../../redux';

export default function Conversation() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { messages, chatScheme } = useSelector(state => state.message);

  useDeepEffect(() => {
    if (!isEmpty(divRef)) {
      divRef.current!.scrollIntoView({ block: 'end', inline: 'nearest' });
    }
  }, []);

  return (
    <>
      <div
        className="flex flex-col-reverse p-3 h-full overflow-y-auto"
        ref={divRef}>
        {messages.map((msg, index) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isLastBubble={index === 0}
            chatScheme={chatScheme}
          />
        ))}
      </div>
    </>
  );
}
