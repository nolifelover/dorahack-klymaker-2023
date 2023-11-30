import { FaChevronLeft } from 'react-icons/fa';
import { MediaPanel } from '../../../../type/conversation';
import classnames from 'classnames';
import { useDispatch, useSelector } from '../../../../redux';
import {
  setConversationDetailPanel,
  setLightBoxPortal,
} from '../../../../redux/layout';
import { capitalize, isEmpty } from 'lodash';
import { useDeepEffect } from '../../../../hook/useDeepEffect';
import {
  initializeFileMedia,
  initializeImageMedia,
} from '../../../../redux/message-media';
import ImageMediaTabSkeleton from '../../../@skeleton/ImageMediaTabSkeleton';
import FileMediaTabSkeleton from '../../../@skeleton/FileMediaTabSkeleton';
import FileCard from './FileCard';

export default function MediaTabPanel() {
  const dispatch = useDispatch();
  const { conversationDetailPanel } = useSelector(state => state.layout);
  const { image, file } = useSelector(state => state.messageMedia);
  const { chatScheme } = useSelector(state => state.message);

  const menus = Object.values(MediaPanel);

  useDeepEffect(() => {
    (async () => {
      if (conversationDetailPanel === MediaPanel.Media) {
        if (!image.success) {
          dispatch(initializeImageMedia());
        }
      } else if (conversationDetailPanel === MediaPanel.File) {
        if (!file.success) {
          dispatch(initializeFileMedia());
        }
      }
    })();
  }, [conversationDetailPanel]);

  const decrypt = (cypher: string) => {
    if (chatScheme) {
      const plain = chatScheme.decrypt(Buffer.from(cypher, 'hex')).toString();
      return plain;
    }
    return '';
  };

  const displayImages = () => {
    if (image.initializing) {
      return (
        <div className="w-full">
          <ImageMediaTabSkeleton />
        </div>
      );
    }

    return (
      <div className="flex flex-wrap w-full">
        {image.media.map(media => {
          const src = decrypt(media.content);
          return (
            <div className="w-[33.33%] p-0.5 border-2 cursor-pointer rounded">
              <img
                onClick={() => dispatch(setLightBoxPortal(src))}
                key={media.content}
                loading="lazy"
                src={src}
                className="aspect-square object-cover object-center w-full"
                alt=""
              />
            </div>
          );
        })}
      </div>
    );
  };

  const displayFiles = () => {
    if (!file.initializing) {
      return (
        <div className="w-full">
          <FileMediaTabSkeleton />
        </div>
      );
    }

    return (
      <div>
        {file.media.slice(0, 3).map(media => {
          if (isEmpty(media.optional)) {
            return <></>;
          }
          const { fileName, fileType, fileSize } = media.optional;
          return (
            <FileCard
              key={media.content}
              fileName={fileName as string}
              fileType={fileType as string}
              fileSize={+fileSize}
              base64={decrypt(media.content)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center min-h-[55px] space-x-2 border-b-2 border-gray-200 px-3 ">
        <div
          className="text-gray-500 w-7 h-7 flex justify-center items-center rounded-full hover:bg-gray-100 cursor-pointer"
          onClick={() => dispatch(setConversationDetailPanel(null))}>
          <FaChevronLeft />
        </div>
        <div className="font-medium text-gray-500">Media and Files</div>
      </div>
      <nav className="flex flex-row justify-around border-b-[1px] px-2">
        {menus.map(m => (
          <div
            key={m}
            onClick={() => dispatch(setConversationDetailPanel(m))}
            className={classnames(
              'flex justify-center items-center',
              'w-1/3',
              'text-sm font-medium',
              'cursor-pointer',
              'text-gray-400 hover:text-gray-600',
              'focus:outline-none',
              'py-3',
              {
                'text-gray-600 border-b-[1px] border-b-primary-400':
                  conversationDetailPanel === m,
              }
            )}>
            {capitalize(m)}
          </div>
        ))}
      </nav>
      <div className="mt-2 px-2 ">
        {conversationDetailPanel === MediaPanel.Media
          ? displayImages()
          : displayFiles()}
      </div>
    </div>
  );
}
