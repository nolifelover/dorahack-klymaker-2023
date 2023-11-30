import { HiOutlineDotsVertical } from 'react-icons/hi';
import {
  ChatBubbleAlign,
  MessageType,
  MessageWithAlignAndSentStatus,
} from '../../../../type/message';
import classNames from 'classnames';
import trimAddress from '../../../../helper/trim-address';
import moment from 'moment';
import PlaceholderAvatar from '../../../@share/PlaceholderAvatar';
import { isEmpty, upperCase } from 'lodash';
import { useDeepEffect } from '../../../../hook/useDeepEffect';
import { useState } from 'react';
import { CryptoAES256 } from '../../../../helper/crypto';
import { FaRegFileAlt } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa6';
import bytes from 'bytes';
import { downloadFile } from '../../../../helper/file';
import { setLightBoxPortal } from '../../../../redux/layout';
import { useDispatch } from '../../../../redux';

type Props = {
  message: MessageWithAlignAndSentStatus;
  isLastBubble: boolean;
  chatScheme: CryptoAES256 | null;
};

export default function ChatBubble({
  message,
  isLastBubble,
  chatScheme,
}: Props) {
  const [plainText, setPlainText] = useState('');
  const dispatch = useDispatch();

  useDeepEffect(() => {
    if (!isEmpty(chatScheme)) {
      try {
        const plain = chatScheme
          .decrypt(Buffer.from(message.content, 'hex'))
          .toString();
        setPlainText(plain);
      } catch (error) {
        setPlainText('Message is encrypted');
      }
    }
  }, [chatScheme]);

  const { align } = message;
  const chatJustify =
    align === ChatBubbleAlign.Left ? 'justify-start' : 'justify-end';
  const avatarOrder = align === ChatBubbleAlign.Left ? 'order-1' : 'order-2';
  const bubbleOrder = align === ChatBubbleAlign.Left ? 'order-2' : 'order-1';
  const bubbleBorder =
    align === ChatBubbleAlign.Left ? 'rounded-tl-none' : 'rounded-tr-none';
  const nameAlign =
    align === ChatBubbleAlign.Left ? 'items-start' : 'items-end';
  const messageOrder = align === ChatBubbleAlign.Left ? 'order-1' : 'order-2';
  const moreIconOrder = align === ChatBubbleAlign.Left ? 'order-2' : 'order-1';
  const moreIconMargin = align === ChatBubbleAlign.Left ? 'ml-1' : 'mr-1';

  const displayTime = () => {
    return message.createdAt?._seconds
      ? moment(message.createdAt?._seconds * 1000).format('HH:mm')
      : '';
  };

  const displaySentStatus = () => {
    if (isLastBubble && align === ChatBubbleAlign.Right) {
      return message.sent ? 'Delivered' : 'Sending...';
    }
    return <></>;
  };

  const displayMessage = () => {
    if (message.contentType === MessageType.IMAGE) {
      return (
        <div
          className=" bg-gray-100 rounded-lg cursor-pointer min-h-[150px]"
          onClick={() => dispatch(setLightBoxPortal(plainText))}>
          <img
            src={plainText}
            alt=""
            className="w-64 object-contain border-2 rounded"
          />
        </div>
      );
    } else if (message.contentType === MessageType.FILE) {
      const { fileName, fileType, fileSize } = message.optional;
      return (
        <>
          <div
            className=" bg-gray-100 rounded-lg cursor-pointer p-3"
            onClick={() => downloadFile(plainText, fileName.toString())}>
            <div className="bg-white rounded-lg py-3 px-5 flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <FaRegFileAlt className="text-xl text-gray-500" />
                  <span className="truncate w-40">{fileName}</span>
                </div>
                <div className="flex text-xs text-gray-500">
                  {bytes(+fileSize)} •{' '}
                  {upperCase(fileType.toString().split('/')[1])}
                </div>
              </div>

              <FaDownload className="text-lg" />
            </div>
          </div>
        </>
      );
    }

    return (
      <span
        className={classNames('px-4 py-2 rounded-lg inline-block bg-gray-100')}>
        {plainText}
      </span>
    );
  };

  if (!chatScheme) {
    return <></>;
  }

  return (
    <div className={classNames('flex mt-4', chatJustify)}>
      <PlaceholderAvatar
        publicAddress={message.senderId}
        className={classNames(avatarOrder)}
      />
      <div
        className={classNames(
          'flex flex-col space-y-2 text-sm max-w-xs mx-2',
          bubbleOrder,
          nameAlign
        )}>
        <div className="flex space-x-2 pt-1">
          <span className="font-bold text-sm">
            {trimAddress(message.senderId)}
          </span>
          <span className="text-sm text-gray-500">{displayTime()}</span>
        </div>
        <div className="flex items-center max-w-[400px] overflow-hidden">
          <span className={classNames(bubbleBorder, messageOrder)}>
            {displayMessage()}
          </span>
          <div
            className={classNames(
              'cursor-pointer text-gray-500 text-lg',
              moreIconOrder,
              moreIconMargin
            )}>
            <HiOutlineDotsVertical />
          </div>
        </div>
        <div className="text-xs text-gray-500">{displaySentStatus()}</div>
      </div>
    </div>
  );
}
