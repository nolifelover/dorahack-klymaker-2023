import { Suspense, LazyExoticComponent } from 'react';
import FullSpinner from './FullSpinner';

/* eslint-disable @typescript-eslint/no-explicit-any */
const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>) => (props: any) => (
    <Suspense fallback={<FullSpinner />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
