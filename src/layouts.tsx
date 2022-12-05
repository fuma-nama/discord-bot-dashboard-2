import AuthLayout from './layouts/auth';
import AppLayout from './layouts/app';
import { Navigate } from 'react-router-dom';
import { RootLayout } from './utils/routeUtils';
import { GroupNavbar } from 'layouts/guild/GroupNavbar';
import { LoginView } from 'views/auth/LoginView';
import { GuildView } from 'views/guild/GuildView';

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
        component: <LoginView />,
      },
    ],
    loggedIn: false,
  },
  {
    path: '/guilds',
    component: <AppLayout />,
    navbar: <GroupNavbar />,
    subLayouts: [
      {
        index: true,
        component: <></>,
      },
      {
        path: ':guild',
        component: <></>,
        subLayouts: [
          {
            index: true,
            component: <GuildView />,
          },
          {
            path: 'settings',
          },
        ],
      },
    ],
    loggedIn: true,
  },
  {
    path: '/user',
    component: <AppLayout />,
    subLayouts: [
      {
        index: true,
        component: <></>,
      },
      {
        path: 'home',
      },
      {
        path: 'profile',
      },
    ],
    loggedIn: true,
  },
  {
    path: '*',
    component: <Navigate to="/user/home" />,
    loggedIn: true,
  },
  {
    path: '*',
    component: <Navigate to="/auth/signin" />,
    loggedIn: false,
  },
];
