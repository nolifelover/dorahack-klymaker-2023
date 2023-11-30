import { useDispatch, useSelector } from '../../../../redux';
import {
  setConversationDetailPanel,
  setLightBoxPortal,
} from '../../../../redux/layout';
import { MediaPanel } from '../../../../type/conversation';
import ImageMediaTabSkeleton from '../../../@skeleton/ImageMediaTabSkeleton';

export default function Media() {
  const dispatch = useDispatch();
  const { preview } = useSelector(state => state.messageMedia);
  const { chatScheme } = useSelector(state => state.message);

  if (!preview.image.media.length) {
    return null;
  }

  const decrypt = (cypher: string) => {
    if (chatScheme) {
      const plain = chatScheme.decrypt(Buffer.from(cypher, 'hex')).toString();
      return plain;
    }
    return '';
  };

  const openLightBox = (src: string) => {
    dispatch(setLightBoxPortal(src));
  };

  const displayPreview = () => {
    const { image } = preview;
    if (image.pageInfo.totalResults >= 3) {
      return (
        <div className="justify-between items-start flex w-[312px] h-[85px] max-w-full gap-1 mt-2">
          {image.media.slice(0, 3).map(media => {
            const src = decrypt(media.content);
            return (
              <img
                onClick={() => openLightBox(src)}
                key={media.content}
                loading="lazy"
                src={src}
                className="aspect-square object-cover object-center w-full justify-between items-start rounded overflow-hidden flex-1 border-2 cursor-pointer"
                alt=""
              />
            );
          })}
          <div
            className="justify-center items-center rounded bg-gray-100 flex flex-col flex-1 w-[calc(100%-2rem)] h-[85px] cursor-pointer"
            onClick={() =>
              dispatch(setConversationDetailPanel(MediaPanel.Media))
            }>
            <div className="text-gray-900 text-sm font-bold leading-[150%] self-center">
              +{image.pageInfo.totalResults - 2}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="items-start flex w-[312px] h-[85px] max-w-full gap-1 mt-2">
        {image.media.map(media => {
          const src = decrypt(media.content);
          return (
            <img
              onClick={() => openLightBox(src)}
              key={media.content}
              loading="lazy"
              src={src}
              className="aspect-square object-cover rounded w-[80px] border-2 cursor-pointer"
              alt=""
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-gray-900 text-sm font-medium leading-[150%]">
          Media
        </h2>
        <a
          onClick={() => dispatch(setConversationDetailPanel(MediaPanel.Media))}
          className="text-blue-700 text-sm font-medium leading-[150%] cursor-pointer">
          See all
        </a>
      </div>

      {preview.initializing ? (
        <ImageMediaTabSkeleton length={3} />
      ) : (
        displayPreview()
      )}
    </div>
  );
}
