import { Box, Flex } from '@chakra-ui/react';
import items from 'sidebar';
import { QueryStatus } from 'components/panel/QueryPanel';
import { useSelfUserQuery } from 'stores';
import { LoadingPanel } from 'components/panel/LoadingPanel';
import { DefaultNavbar } from 'components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarResponsive } from 'layouts/sidebar/Sidebar';
import { useLayoutOverride } from 'utils/routeUtils';
import { layouts } from 'layouts';

export default function AppLayout() {
  const query = useSelfUserQuery();

  return (
    <Flex direction="row" h="full">
      <Sidebar items={items} />
      <SidebarResponsive items={items} />
      <QueryStatus
        query={query}
        loading={<LoadingPanel size="sm" />}
        error="Failed to load user info"
      >
        <Content />
      </QueryStatus>
    </Flex>
  );
}

function Content() {
  const navbar = useLayoutOverride(layouts, (layout) => layout.navbar != null)?.navbar;

  return (
    <Flex
      pos="relative"
      direction="column"
      float="right"
      height="100%"
      overflow="auto"
      position="relative"
      p={{ base: '10px', '3sm': '30px' }}
      w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
      maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
      maxHeight="100%"
      transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
      transitionDuration=".2s, .2s, .35s"
      transitionProperty="top, bottom, width"
      transitionTimingFunction="linear, linear, ease"
    >
      {navbar ?? <DefaultNavbar />}
      <Box mx="auto" w="full" maxW="1200px" padding={0} flex={1} mt="30px">
        <Outlet />
      </Box>
    </Flex>
  );
}
