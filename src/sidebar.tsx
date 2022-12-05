import { Icon } from '@chakra-ui/react';
import { MdPerson, MdHome } from 'react-icons/md';

const items: SidebarItem[] = [
  {
    name: 'Main Dashboard',
    path: '/user/home',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Profile',
    path: '/user/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
];

export default items;
