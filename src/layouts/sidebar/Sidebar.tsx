// chakra imports
import {
  Box,
  Drawer,
  DrawerBody,
  useColorModeValue,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { SidebarContent } from './components/SidebarContent';

import { SidebarItemInfo, useLayoutOverride } from 'utils/routeUtils';
import { usePageStore, useSelectedGuild } from 'stores';
import { layouts } from 'layouts';

export function Sidebar({ items }: { items: SidebarItemInfo[] }) {
  const variantChange = '0.2s linear';
  const shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
  // Chakra Color Mode
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const sidebarMargins = '0px';

  // SIDEBAR
  return (
    <Box display={{ base: 'none', xl: 'block' }} minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="300px"
        h="100vh"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Content items={items} />
      </Box>
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive({ items }: { items: SidebarItemInfo[] }) {
  const sidebarBackgroundColor = useColorModeValue('white', 'navy.800');
  const [isOpen, setOpen] = usePageStore((s) => [s.sidebarIsOpen, s.setSidebarIsOpen]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      placement={document.documentElement.dir === 'rtl' ? 'right' : 'left'}
    >
      <DrawerOverlay />
      <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
        <DrawerCloseButton
          zIndex="3"
          onClick={() => setOpen(false)}
          _focus={{ boxShadow: 'none' }}
          _hover={{ boxShadow: 'none' }}
        />
        <DrawerBody maxW="285px" px="0rem" pb="0">
          <Content items={items} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function Content({ items }: { items: SidebarItemInfo[] }) {
  const sidebar = useLayoutOverride(layouts, (layout) => layout.sidebar != null)?.sidebar;
  const { selected, setSelected } = useSelectedGuild();

  return sidebar ?? <SidebarContent items={items} selected={selected} onSelect={setSelected} />;
}
// PROPS

export default Sidebar;
