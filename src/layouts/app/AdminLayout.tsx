// Chakra imports
import { Box, Flex } from '@chakra-ui/react';
import { DefaultNavbar } from 'components/navbar/Navbar';
// Layout components
import { Outlet, useLocation } from 'react-router-dom';
import { getActiveSidebarItem } from 'utils/routeUtils';
import { layouts } from '../../layouts';
import items from '../../sidebar';

export default function AdminLayout() {
  document.documentElement.dir = 'ltr';
  const location = useLocation();
  const activeItem = getActiveSidebarItem(items, location);

  return (
    <Flex
      direction="column"
      float="right"
      height="100%"
      overflow="auto"
      position="relative"
      p={{ base: '10px', md: '30px' }}
      w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
      maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
      maxHeight="100%"
      transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
      transitionDuration=".2s, .2s, .35s"
      transitionProperty="top, bottom, width"
      transitionTimingFunction="linear, linear, ease"
    >
      <DefaultNavbar brandText={activeItem?.name} layoutes={layouts} />
      <Box mx="auto" w="full" pe="20px" padding={0} flex="1 1" mt="50px">
        <Outlet />
      </Box>
    </Flex>
  );
}
