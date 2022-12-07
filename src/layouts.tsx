import AuthLayout from './layouts/auth';
import AppLayout from './layouts/app';
import { Navigate } from 'react-router-dom';
import { RootLayout } from './utils/routeUtils';
import { GroupNavbar } from 'layouts/guild/GroupNavbar';
import { LoginView } from 'views/auth/LoginView';
import { GuildView } from 'views/guild/GuildView';
import { GuildLayout } from 'layouts/guild/GuildLayout';

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
    component: <AppLayout />,
    subLayouts: [
      {
        path: '/guilds/:guild',
        navbar: <GroupNavbar />,
        component: <GuildLayout />,
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
      {
        path: '/user',
        subLayouts: [
          {
            index: true,
            component: <></>,
          },
          {
            path: 'home',
            component: <></>,
          },
          {
            path: 'profile',
            component: <></>,
          },
        ],
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
