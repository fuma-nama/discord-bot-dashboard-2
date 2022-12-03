/* eslint-disable */

import { NavLink, useLocation } from 'react-router-dom';
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { SidebarItem, getActiveSidebarItem } from 'utils/routeUtils';

export function SidebarItems({ items }: { items: SidebarItem[] }) {
  const location = useLocation();
  const active = getActiveSidebarItem(items, location);

  return (
    <>
      {items.map((route: SidebarItem, index: number) => (
        <Link key={index} item={route} active={active === route} />
      ))}
    </>
  );
}

function Link(props: { item: SidebarItem; active: boolean }) {
  const { item, active } = props;
  let activeColor = useColorModeValue('gray.700', 'white');
  let activeIcon = useColorModeValue('brand.500', 'white');
  let textColor = useColorModeValue('secondaryGray.500', 'white');
  let brandColor = useColorModeValue('brand.500', 'brand.400');

  return (
    <NavLink to={item.path}>
      <Box>
        <HStack spacing={active ? '22px' : '26px'} py="5px" ps="10px">
          <Flex w="100%" alignItems="center" justifyContent="center">
            <Box color={active ? activeIcon : textColor} me="18px">
              {item.icon}
            </Box>
            <Text
              me="auto"
              color={active ? activeColor : textColor}
              fontWeight={active ? 'bold' : 'normal'}
            >
              {item.name}
            </Text>
          </Flex>
          <Box h="36px" w="4px" bg={active ? brandColor : 'transparent'} borderRadius="5px" />
        </HStack>
      </Box>
    </NavLink>
  );
}

export default SidebarItems;
