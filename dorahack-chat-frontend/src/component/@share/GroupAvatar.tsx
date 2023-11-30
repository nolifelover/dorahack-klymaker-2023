type Props = {
  src: string[];
  size?: number;
  className?: string;
};

export default function GroupAvatar({ src, size = 32, className }: Props) {
  const avatarClass = `w-[${size}px] h-[${size}px] rounded-full object-cover ${className}`;

  if (src.length === 1) {
    return <img className={avatarClass} src={src[0]} alt="" />;
  }
  return (
    <div className="flex items-center -space-x-5">
      <img
        className="w-[30px] h-[30px] rounded-full dark:border-gray-800"
        src={src[0]}
        alt=""
      />
      <img
        className="w-[28px] h-[28px] border-2 border-white rounded-full dark:border-gray-800"
        src={src[1]}
        alt=""
      />
    </div>
  );
}
