import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import reduxStore from '../redux';

export default function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={reduxStore}>{children}</Provider>;
}
