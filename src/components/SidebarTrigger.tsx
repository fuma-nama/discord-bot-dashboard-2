import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { IoMenuOutline } from 'react-icons/io5';
import { usePageStore } from 'stores';

export function SidebarTrigger() {
  const menuColor = useColorModeValue('gray.400', 'white');
  const setOpen = usePageStore((s) => s.setSidebarIsOpen);

  return (
    <Flex display={{ sm: 'flex', xl: 'none' }} alignItems="center">
      <Flex w="max-content" h="max-content" onClick={() => setOpen(true)}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: 'pointer' }}
        />
      </Flex>
    </Flex>
  );
}
