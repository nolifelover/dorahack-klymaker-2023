export default function FetchingLanding() {
  return (
    <div className="flex h-full">
      <div className="m-auto">
        <div className="flex flex-col justify-center items-center p-3">
          <div className="flex justify-center items-center pb-7 pt-3">
            <img src="/svg/fetching.svg" alt="" />
          </div>
          <h2 className="text-center text-4xl font-semibold text-muted-light mb-2">
            Fetching data
          </h2>
          <span className="text-center font-normal text-muted-light mb-4">
            Please wait while we are fetching data from server and blockchain.
          </span>
        </div>
      </div>
    </div>
  );
}
