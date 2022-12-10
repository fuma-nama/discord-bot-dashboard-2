import { SettingsIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { MdPerson, MdDashboard } from 'react-icons/md';
import { SidebarItemInfo } from 'utils/routeUtils';

const items: SidebarItemInfo[] = [
  {
    name: 'Dashboard',
    path: '/user/home',
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Profile',
    path: '/user/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Settings',
    path: '/user/settings',
    icon: <Icon as={SettingsIcon} width="20px" height="20px" color="inherit" />,
    hidden: true,
  },
];

export default items;
