// Chakra Imports
import {
  Box,
  BoxProps,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  FlexProps,
  SkeletonText,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { getActiveSidebarItem } from 'utils/routeUtils';
import AdminNavbarLinks from './NavbarItems';
import { IoHome } from 'react-icons/io5';
import items from 'sidebar';
import { ChevronRightIcon } from '@chakra-ui/icons';

export function DefaultNavbar({ children }: { children?: ReactNode }) {
  const activeItem = getActiveSidebarItem(items, useLocation());

  const mainText = useColorModeValue('navy.700', 'white');
  const linkColor = useColorModeValue('brand.400', 'cyan.200');

  const breadcrumb = [
    {
      icon: <IoHome />,
      text: 'Pages',
      to: '/user/home',
    },
  ];

  if (activeItem != null)
    breadcrumb.push({
      icon: activeItem.icon,
      text: activeItem.name,
      to: activeItem.path,
    });

  return (
    <NavbarBox box={{ maxW: '1230px' }}>
      <Flex mb={{ sm: '8px', md: '0px' }} direction="column" gap={3}>
        <Breadcrumb fontSize="sm" separator={<ChevronRightIcon color={linkColor} />}>
          {breadcrumb.map((item, i) => (
            <BreadcrumbItem key={i}>
              <Tag
                as={Link}
                to={item.to}
                gap={1}
                rounded="full"
                colorScheme="brand"
                color={linkColor}
              >
                {item.icon}
                <Text>{item.text}</Text>
              </Tag>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Text color={mainText} fontWeight="bold" fontSize="34px">
          {activeItem?.name || <SkeletonText w="full" noOfLines={2} />}
        </Text>
      </Flex>
      {children ?? <AdminNavbarLinks />}
    </NavbarBox>
  );
}

export function NavbarBox({
  box,
  bar,
  children,
}: {
  box?: BoxProps;
  bar?: FlexProps;
  children: ReactNode;
}) {
  const navbarBackdrop = 'blur(20px)';
  const navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');

  return (
    <Box
      zIndex="sticky"
      pos="sticky"
      bg={navbarBg}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: 'center' }}
      display="flex"
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      pb="16px"
      px={{
        sm: '15px',
        md: '10px',
      }}
      ps={{
        xl: '12px',
      }}
      pt="8px"
      top={0}
      w="full"
      {...box}
    >
      <Flex
        w="100%"
        direction={{
          base: 'column',
          '3sm': 'row',
        }}
        gap={2}
        justify="space-between"
        alignItems="stretch"
        {...bar}
      >
        {children}
      </Flex>
    </Box>
  );
}
