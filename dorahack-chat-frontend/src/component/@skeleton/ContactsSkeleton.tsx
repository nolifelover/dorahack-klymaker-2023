import Skeleton from 'react-loading-skeleton';

export default function ContactsSkeleton() {
  return (
    <div className="px-3">
      <div className="text-gray-500 text-base font-normal pb-1 px-1">
        Contacts
      </div>

      {Array.from(Array(10).keys()).map(i => (
        <span className="flex items-center space-x-1 py-1.5" key={i}>
          <Skeleton circle containerClassName="flex" height={32} width={32} />
          <div className="flex flex-col justify-center pl-2">
            <Skeleton containerClassName="flex-1" height={12} width={180} />
          </div>
        </span>
      ))}
    </div>
  );
}
