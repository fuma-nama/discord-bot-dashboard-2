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

import { SidebarItemInfo } from 'utils/routeUtils';
import { usePageStore, useSelectedGuild } from 'stores';

export function Sidebar({ items }: { items: SidebarItemInfo[] }) {
  const { selected, setSelected } = useSelectedGuild();

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
        <SidebarContent items={items} selected={selected} onSelect={setSelected} />
      </Box>
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive({ items }: { items: SidebarItemInfo[] }) {
  const sidebarBackgroundColor = useColorModeValue('white', 'navy.800');
  const [isOpen, setOpen] = usePageStore((s) => [s.sidebarIsOpen, s.setSidebarIsOpen]);
  const { selected, setSelected } = useSelectedGuild();

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
          <SidebarContent items={items} selected={selected} onSelect={setSelected} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
// PROPS

export default Sidebar;
