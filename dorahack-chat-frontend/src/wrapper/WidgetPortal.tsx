import { PropsWithChildren } from 'react';
import { useDeepEffect } from '../hook/useDeepEffect';
import { useDispatch } from '../redux';
import { setIsWidget } from '../redux/layout';

export default function WidgetPortal({ children }: PropsWithChildren) {
  const dispatch = useDispatch();

  useDeepEffect(() => {
    if (location.pathname.split('/')[1] === 'widget') {
      dispatch(setIsWidget(true));
    }
  }, [location.pathname]);

  return <>{children}</>;
}
