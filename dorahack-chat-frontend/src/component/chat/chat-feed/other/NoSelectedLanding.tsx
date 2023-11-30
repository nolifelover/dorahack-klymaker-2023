type Props = {
  title: string;
  description: string;
};

export default function NoSelectedLanding({ title, description }: Props) {
  return (
    <div className="flex h-full">
      <div className="m-auto">
        <div className="flex flex-col justify-center items-center p-3">
          <div className="flex justify-center items-center pb-7 pt-3">
            <img src="/svg/selection.svg" alt="" />
          </div>
          <h2 className="text-center text-4xl font-semibold text-muted-light mb-2">
            {title}
          </h2>
          <span className="text-center font-normal text-muted-light mb-4">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}
