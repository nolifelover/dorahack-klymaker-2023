import { PropsWithChildren } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

export default function SkeletonThemeProvider({ children }: PropsWithChildren) {
  return (
    <SkeletonTheme
      baseColor="rgba(209, 213, 219, 1)"
      highlightColor="rgba(229, 231, 235, 1)">
      {children}
    </SkeletonTheme>
  );
}
