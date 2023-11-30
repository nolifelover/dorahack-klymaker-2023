import { BrowserRouter } from 'react-router-dom';
import { CombineComponents } from './wrapper/CombineComponents';
import WagmiProvider from './wrapper/WagmiProvider';
import ErrorBoundary from './wrapper/ErrorBoundary';
import SkeletonTheme from './wrapper/SkeletonTheme';
import AppRoutes from './route/AppRoutes';
import FlowbiteProvider from './wrapper/FlowbiteProvider';
import ToastifyPortal from './wrapper/ToastifyPortal';
import ContractPortal from './wrapper/ContractPortal';
import AccountPortal from './wrapper/AccountPortal';
import FirebasePortal from './wrapper/FirebasePortal';
import LightBoxPortal from './wrapper/LightBoxPortal';
import ReduxProvider from './wrapper/ReduxProvider';
import WidgetPortal from './wrapper/WidgetPortal';
import Web3InboxPortal from './wrapper/Web3InboxPortal';

const providers = [
  ReduxProvider,
  ErrorBoundary,
  WidgetPortal,
  ToastifyPortal,
  SkeletonTheme,
  LightBoxPortal,
  FlowbiteProvider,
  WagmiProvider,
  ContractPortal,
  AccountPortal,
  FirebasePortal,
  Web3InboxPortal,
  BrowserRouter,
];
const AppProvider = CombineComponents(...providers);

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
