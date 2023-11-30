import Skeleton from 'react-loading-skeleton';

export default function FileMediaTabSkeleton({
  length = 9,
}: {
  length?: number;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {Array.from(Array(length).keys()).map(i => (
        <Skeleton
          key={i}
          containerClassName="flex-1"
          height={80}
          width={'100%'}
        />
      ))}
    </div>
  );
}
