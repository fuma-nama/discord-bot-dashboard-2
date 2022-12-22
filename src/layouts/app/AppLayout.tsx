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
import { show } from 'theme';

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
  return (
    <Flex
      pos="relative"
      direction="column"
      height="100%"
      overflow="auto"
      w="full"
      maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
      maxHeight="100%"
    >
      <LayoutNavbar />
      <Box
        mx="auto"
        w="full"
        maxW="1200px"
        flex={1}
        mt={{ base: '30px', [show.sidebar]: '50px' }}
        px={{ base: '10px', '3sm': '30px' }}
      >
        <Outlet />
      </Box>
    </Flex>
  );
}

function LayoutNavbar() {
  const navbar = useLayoutOverride(layouts, (layout) => layout.navbar != null)?.navbar;

  return (
    <Box
      top={0}
      mx="auto"
      maxW="1230px"
      zIndex="sticky"
      pos="sticky"
      w="full"
      px={{ [show.navbar]: '30px' }}
      pt={{ [show.navbar]: '16px' }}
    >
      {navbar ?? <DefaultNavbar />}
    </Box>
  );
}
