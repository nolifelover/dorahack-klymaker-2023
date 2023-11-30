import { RouteObject, useRoutes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import AuthGuard from '../guard/AuthGuard';
import GuestGuard from '../guard/GuestGuard';
import ChatFeed from '../page/chat-feed/ChatFeed';
import Error404 from '../page/miscellaneous/Error404';
import Unauthorized from '../page/unauthorize/Unauthorized';
import WidgetLayout from '../layout/WidgetLayout';
import ChatWidget from '../page/chat-widget/ChatWidget';
import WidgetGuard from '../guard/WidgetGuard';
import Setting from '../page/setting/Setting';

const routes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: ':tab?/:id?',
          element: (
            <AuthGuard>
              <ChatFeed />
            </AuthGuard>
          ),
        },
        {
          path: '/settings',
          element: (
            <AuthGuard>
              <Setting />
            </AuthGuard>
          ),
        },
        {
          path: 'unauthorized',
          element: (
            <GuestGuard>
              <Unauthorized />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/widget',
      element: <WidgetLayout />,
      children: [
        {
          path: 'chat/:address?',
          element: (
            <WidgetGuard>
              <ChatWidget />
            </WidgetGuard>
          ),
        },
        {
          path: 'unauthorized',
          element: (
            <GuestGuard>
              <Unauthorized />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Error404 />,
    },
  ],
};

export default function AppRoutes() {
  return useRoutes([routes]);
}
