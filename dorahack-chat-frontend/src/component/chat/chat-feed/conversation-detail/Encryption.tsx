import { TbLockSquareRounded } from 'react-icons/tb';

export default function Encryption() {
  return (
    <div className="items-start self-stretch flex justify-between gap-0.5">
      <div className="justify-center items-start self-stretch flex flex-col grow shrink-0 basis-auto">
        <div className="items-start self-stretch flex gap-2">
          <TbLockSquareRounded className="w-16px h-16px text-gray-500" />
          <div className="text-gray-900 text-sm font-medium leading-[150%] max-w-[295px] grow shrink-0 basis-auto">
            Encryption
          </div>
        </div>
        <div
          className="text-gray-500 text-xs leading-[150%] mt-1"
          style={{ whiteSpace: 'pre' }}>
          Messages are end-to-end encrypted by using blockchain. Click to start.
        </div>
      </div>
      <img
        loading="lazy"
        srcSet="..."
        className="aspect-square object-cover object-center w-3 overflow-hidden self-center max-w-full my-auto"
      />
    </div>
  );
}
