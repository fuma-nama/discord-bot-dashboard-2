import AuthLayout from './layouts/auth/AuthLayout';
import AppLayout from './layouts/app/AppLayout';
import { Navigate } from 'react-router-dom';
import { RootLayout } from './utils/routeUtils';
import { GroupNavbar } from 'layouts/guild/GroupNavbar';
import { LoginView } from 'views/auth/LoginView';
import { GuildView } from 'views/guild/GuildView';
import { GuildLayout } from 'layouts/guild/GuildLayout';
import { FeatureView } from 'views/feature/FeatureView';
import { DashboardView } from 'views/dashboard/DashboardView';
import { ProfileView } from 'views/profile/ProfileView';
import { InGuildSidebar } from 'layouts/guild/GuildSidebar';
import { GuildSettingsView } from 'views/guild/settings/GuildSettingsView';
import { CallbackView } from 'views/auth/CallbackView';

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
    path: '/callback',
    component: <CallbackView />,
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
            path: 'features/:feature',
            component: <FeatureView />,
            navbar: <GroupNavbar back />,
            sidebar: <InGuildSidebar />,
          },
          {
            path: 'settings',
            component: <GuildSettingsView />,
            navbar: <GroupNavbar back />,
            sidebar: <InGuildSidebar />,
          },
        ],
      },
      {
        path: '/user',
        subLayouts: [
          {
            index: true,
            component: <Navigate to="/user/home" />,
          },
          {
            path: 'home',
            component: <DashboardView />,
          },
          {
            path: 'profile',
            component: <ProfileView />,
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
