import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from '../../../../redux';
import FileCard from './FileCard';
import { setConversationDetailPanel } from '../../../../redux/layout';
import { MediaPanel } from '../../../../type/conversation';
import FileMediaTabSkeleton from '../../../@skeleton/FileMediaTabSkeleton';

export default function File() {
  const dispatch = useDispatch();
  const { preview } = useSelector(state => state.messageMedia);
  const { chatScheme } = useSelector(state => state.message);

  if (!preview.file.media.length || isEmpty(chatScheme)) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-900 text-sm font-medium leading-[150%]">
          Files
        </h2>
        <a
          onClick={() => dispatch(setConversationDetailPanel(MediaPanel.File))}
          className="text-blue-700 text-sm font-medium leading-[150%] cursor-pointer">
          See all
        </a>
      </div>

      {preview.initializing ? (
        <FileMediaTabSkeleton length={3} />
      ) : (
        <>
          {preview.file.media.slice(0, 3).map(media => {
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
                base64={chatScheme
                  .decrypt(Buffer.from(media.content, 'hex'))
                  .toString()}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
