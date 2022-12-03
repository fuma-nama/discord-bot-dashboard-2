import AuthLayout from './layouts/auth';
import AppLayout from './layouts/app';
import { Navigate } from 'react-router-dom';
import { RootLayout } from './utils/routeUtils';
import { GroupNavbar } from 'layouts/guild/GroupNavbar';

export const layouts: RootLayout[] = [
  {
    path: '/auth',
    component: <AuthLayout />,
    subLayouts: [
      {
        index: true,
        component: <Navigate to="/auth/signin" />,
      },
      {
        path: 'signin',
      },
    ],
    loggedIn: false,
  },
  {
    path: '*',
    component: <AppLayout />,
    subLayouts: [
      {
        index: true,
        component: <Navigate to="/user/home" />,
      },
      {
        path: 'guilds',
        navbar: <GroupNavbar />,
        subLayouts: [
          {
            index: true,
          },
          {
            path: ':guild',
            subLayouts: [
              {
                index: true,
              },
              {
                path: 'settings',
              },
            ],
          },
        ],
      },
      {
        path: 'user',
        subLayouts: [
          {
            index: true,
          },
        ],
      },
    ],
    loggedIn: true,
  },
];
