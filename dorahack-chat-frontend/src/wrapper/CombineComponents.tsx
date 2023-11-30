import { ReactElement, FC, JSXElementConstructor } from 'react';

type ChildrenProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

export const CombineComponents = (
  ...components: FC<ChildrenProps>[]
): FC<ChildrenProps> => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};
