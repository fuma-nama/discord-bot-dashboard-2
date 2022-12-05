import { Icon } from '@chakra-ui/react';
import { MdPerson, MdDashboard } from 'react-icons/md';

const items: SidebarItem[] = [
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
];

export default items;
