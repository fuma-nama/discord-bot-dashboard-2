/* eslint-disable */

import { NavLink, useLocation } from 'react-router-dom';
// chakra imports
import { Box, Card, CardBody, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { SidebarItem, getActiveSidebarItem } from 'utils/routeUtils';
import { useColors, useItemHoverBg } from 'theme';

export function SidebarItems({ items }: { items: SidebarItem[] }) {
  const location = useLocation();
  const active = getActiveSidebarItem(items, location);

  return (
    <>
      {items
        .filter((item) => !item.hidden)
        .map((route: SidebarItem, index: number) => (
          <Link key={index} item={route} active={active === route} />
        ))}
    </>
  );
}

function Link(props: { item: SidebarItem; active: boolean }) {
  const { item, active } = props;
  let activeColor = useColorModeValue('gray.700', 'white');
  let textColor = useColorModeValue('secondaryGray.500', 'navy.100');
  const { brand, globalBg, cardBg } = useColors();
  const hover = useItemHoverBg();

  return (
    <NavLink to={item.path}>
      <HStack bg={cardBg} py={2} px={3} rounded="lg" {...(active && hover)}>
        <Box color={active ? 'white' : brand} bg={active ? brand : globalBg} p={1} rounded="lg">
          <Box w="20px" h="20px">
            {item.icon}
          </Box>
        </Box>
        <Text
          me="auto"
          color={active ? activeColor : textColor}
          fontWeight={active ? 'bold' : 'normal'}
        >
          {item.name}
        </Text>
      </HStack>
    </NavLink>
  );
}

export default SidebarItems;
