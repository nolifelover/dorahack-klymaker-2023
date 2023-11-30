import bytes from 'bytes';
import { upperCase } from 'lodash';
import { BsDot } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { downloadFile } from '../../../../helper/file';

type Props = {
  fileName: string;
  fileSize: number;
  fileType: string;
  base64: string;
};

export default function FileCard({
  fileName,
  fileSize,
  fileType,
  base64,
}: Props) {
  return (
    <div
      className="bg-gray-50 p-3 rounded-lg my-2 cursor-pointer border-2"
      onClick={() => downloadFile(base64, fileName.toString())}>
      <div className="flex items-center space-x-2">
        <CgFileDocument className="w-16px h-16px text-gray-500 " />
        <div className="text-gray-500 text-sm leading-[150%] truncate w-52">
          {fileName}
        </div>
      </div>
      <div className="flex items-center mt-1 space-x-2">
        <div className="text-gray-500 text-xs leading-[150%]">
          {bytes(+fileSize)}
        </div>
        <BsDot className="w-3px h-3px text-gray-500" />
        <div className="text-gray-500 text-xs leading-[150%]">
          {upperCase(fileType.toString().split('/')[1])}
        </div>
      </div>
    </div>
  );
}
