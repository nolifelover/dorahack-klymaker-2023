import Skeleton from 'react-loading-skeleton';

export default function ConversationsSkeleton() {
  return (
    <div className="px-3">
      <div className="text-gray-500 text-base font-normal pb-1 px-1">
        Conversation
      </div>

      {Array.from(Array(10).keys()).map(i => (
        <div className="flex py-1.5 justify-between" key={i}>
          <span className="flex items-center space-x-1">
            <Skeleton circle containerClassName="flex" height={38} width={38} />
            <div className="flex flex-col  justify-center">
              <Skeleton containerClassName="flex-1" height={12} width={150} />
              <Skeleton containerClassName="flex " height={12} width={90} />
            </div>
          </span>
          <Skeleton containerClassName="flex pt-2" height={7} width={15} />
        </div>
      ))}
    </div>
  );
}
