export default function EmptyContact() {
  return (
    <div className="px-3 my-10">
      <div className="flex justify-center items-center pb-3">
        <img src="/svg/search-user.svg" width={'30%'} alt="" />
      </div>
      <p className="text-center text-xs text-muted-light mb-2">
        Contact is empty
      </p>
    </div>
  );
}
