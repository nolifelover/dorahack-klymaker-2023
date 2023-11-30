import { Button, Spinner, Textarea } from 'flowbite-react';
import bytes from 'bytes';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { useDispatch } from '../../../../redux';
import { sendMessage } from '../../../../redux/message';
import {
  maxUploadFileSize,
  maxUploadImageSize,
} from '../../../../constant/file';
import { toast } from 'react-toastify';
import { fileToBase64 } from '../../../../helper/file';
import { MessageType, SendingMessageState } from '../../../../type/message';
import { FaRegFileAlt } from 'react-icons/fa';

export default function Input() {
  const hiddenImageInput = useRef<HTMLInputElement | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [fileUploading, setFileUploading] = useState(false);
  const [message, setMessage] = useState<SendingMessageState>({
    type: null,
    content: '',
    optional: {},
  });

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({
      content: e.target.value,
      type: MessageType.TEXT,
    });
  };

  const handleImageInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (file.size > bytes.parse(maxUploadImageSize)) {
      const fileSize = bytes(file.size);
      return toast.error(
        `Please make sure your image is no larger than ${maxUploadImageSize}. (${fileSize})`
      );
    }
    setFileUploading(true);
    const base64 = await fileToBase64(file);
    setFileUploading(false);
    setMessage({
      content: base64,
      type: MessageType.IMAGE,
    });
  };

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (file.size > bytes.parse(maxUploadFileSize)) {
      const fileSize = bytes(file.size);
      return toast.error(
        `Please make sure your file is no larger than ${maxUploadFileSize}. (${fileSize})`
      );
    }
    setFileUploading(true);
    const base64 = await fileToBase64(file);
    setFileUploading(false);
    setMessage({
      content: base64,
      type: MessageType.FILE,
      optional: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      },
    });
  };

  const handleResetMessageState = () => {
    setMessage({
      content: '',
      type: null,
      optional: {},
    });
  };

  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = async () => {
    const { content, type } = message;
    if (content && type) {
      dispatch(sendMessage(message));
      handleResetMessageState();
    }
  };

  const displayInputElement = () => {
    if (fileUploading) {
      return (
        <div className="flex justify-center items-center h-full w-[100px]">
          <Spinner />
        </div>
      );
    }
    if (message.type === MessageType.FILE) {
      return (
        <div className="relative p-2 bg-gray-200 rounded-lg h-full w-[82px] dark:bg-gray-700 flex justify-center items-center">
          <FaRegFileAlt className="text-5xl text-gray-500" />
          <button
            onClick={handleResetMessageState}
            type="button"
            className="absolute bottom-1 left-1 text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Delete image</span>
          </button>
        </div>
      );
    }

    if (message.type === MessageType.IMAGE) {
      return (
        <div className="relative p-2 bg-gray-10 rounded-lg h-full w-full dark:bg-gray-700">
          <img src={message.content} alt="" className="h-full object-cover" />
          <button
            onClick={handleResetMessageState}
            type="button"
            className="absolute bottom-1 left-1 text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Delete image</span>
          </button>
        </div>
      );
    }

    return (
      <Textarea
        placeholder="Write a reply ..."
        className="resize-none bg-white border-0 rounded-none focus:ring-0 h-full"
        value={message.content}
        onChange={handleMessageChange}
        onKeyDown={onEnterPress}
      />
    );
  };

  return (
    <div className="border-t-2 border-gray-200 bg-white">
      <div className="h-[100px] p-1">{displayInputElement()}</div>
      <div className="flex justify-between items-center p-2.5 border-t-2">
        <div className="flex divide-x space-x-3">
          <div className="flex items-center space-x-3">
            <div
              className="cursor-pointer"
              onClick={() =>
                hiddenFileInput?.current && hiddenFileInput?.current.click()
              }>
              <img src="/svg/paperclip.svg" alt="" />
              <input
                type="file"
                accept="audio/*, video/*, application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, text/plai, text/html"
                onChange={handleFileInputChange}
                ref={hiddenFileInput}
                className="hidden"
              />
            </div>
            <div className="cursor-pointer">
              <img src="/svg/location.svg" alt="" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() =>
                hiddenImageInput?.current && hiddenImageInput?.current.click()
              }>
              <img src="/svg/gallery.svg" alt="" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageInputChange}
                ref={hiddenImageInput}
                className="hidden"
              />
            </div>
            <div className="cursor-pointer">
              <img src="/svg/emoji.svg" alt="" />
            </div>
          </div>

          <div className="flex items-center space-x-3 pl-3">
            <div className="cursor-pointer">
              <img src="/svg/setting.svg" alt="" />
            </div>
            <div className="cursor-pointer">
              <img src="/svg/calendar.svg" alt="" />
            </div>
            <div className="cursor-pointer">
              <img src="/svg/download.svg" alt="" />
            </div>
          </div>
        </div>
        <Button size="sm" color="primary" onClick={() => onSubmit()}>
          Send message
        </Button>
      </div>
    </div>
  );
}
