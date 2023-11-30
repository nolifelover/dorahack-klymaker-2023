import Skeleton from 'react-loading-skeleton';

export default function ImageMediaTabSkeleton({
  length = 24,
}: {
  length?: number;
}) {
  return (
    <div className="flex flex-wrap w-full">
      {Array.from(Array(length).keys()).map(i => (
        <div className="w-[33.33%] aspect-square p-0.5" key={i}>
          <Skeleton height={'100%'} width={'100%'} />
        </div>
      ))}
    </div>
  );
}
