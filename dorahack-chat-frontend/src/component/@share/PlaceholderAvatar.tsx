import classNames from 'classnames';

type Props = {
  publicAddress?: string;
  profileSrc?: string;
  size?: number;
  className?: string;
};

export default function PlaceholderAvatar({
  publicAddress,
  profileSrc,
  size = 32,
  className,
}: Props) {
  if (profileSrc) {
    return (
      <img
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`rounded-full object-cover ${className}`}
        src={profileSrc}
        alt=""
      />
    );
  }

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={classNames(
        'relative inline-flex items-center justify-center overflow-hidden border-2 bg-gray-100 rounded-full dark:bg-gray-600',
        className
      )}>
      {/* mock */}
      {/* <img
        src="https://fastly.picsum.photos/id/515/400/400.jpg?hmac=ObxAgpXcysaLz2Z0PZFebIrE4osfn6Gq0ukt_bElwOM"
        alt="mock image"
      /> */}
      {/* end mock */}
      <span className="font-medium text-gray-600 text-xs leading-3">
        {!!publicAddress && publicAddress.substring(publicAddress.length - 3)}
      </span>
    </div>
  );
}
