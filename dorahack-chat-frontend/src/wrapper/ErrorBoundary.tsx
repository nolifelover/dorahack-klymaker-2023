import { ErrorBoundary } from 'react-error-boundary';
import Error500 from '../page/miscellaneous/Error500';
import { PropsWithChildren } from 'react';
import { ErrorType } from '../type/common';

export default function ErrorBoundaryProvider({ children }: PropsWithChildren) {
  function Fallback({ error }: { error: ErrorType }) {
    console.error(error);

    return <Error500 />;
  }

  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}
