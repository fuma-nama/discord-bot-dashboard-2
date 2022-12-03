// Chakra Imports
import {
  Box,
  BoxProps,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  ChakraProps,
  Flex,
  FlexProps,
  Link,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';
import { Location, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { getActiveLayouts, NormalLayout, RootLayout } from 'utils/routeUtils';
import AdminNavbarLinks from './NavbarItems';
import { findLast } from 'utils/common';

export function useLayoutOverride(layouts: RootLayout[], filter: (item: NormalLayout) => boolean) {
  const location = useLocation();
  const override = findLast(getActiveLayouts(location, layouts), filter);

  return override;
}

export function DefaultNavbar(
  props: {
    brandText: string;
    layoutes: RootLayout[];
  } & ChakraProps
) {
  const { brandText, layoutes } = props;
  const mainText = useColorModeValue('navy.700', 'white');
  const secondaryText = useColorModeValue('gray.700', 'white');
  const override = useLayoutOverride(layoutes, (layout) => layout.navbar != null);

  if (override?.navbar != null) {
    return override.navbar;
  }

  return (
    <NavbarBox>
      <Box mb={{ sm: '8px', md: '0px' }}>
        <Breadcrumb>
          <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
            <BreadcrumbLink href="#" color={secondaryText}>
              Pages
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem color={secondaryText} fontSize="sm">
            <BreadcrumbLink href="#" color={secondaryText}>
              {brandText || <Skeleton w="200px" height="20px" rounded="lg" />}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Link
          color={mainText}
          href="#"
          bg="inherit"
          borderRadius="inherit"
          fontWeight="bold"
          fontSize="34px"
          _hover={{ color: { mainText } }}
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{
            boxShadow: 'none',
          }}
        >
          {brandText || <SkeletonText w="full" noOfLines={2} />}
        </Link>
      </Box>
      {override?.navbarLinks || <AdminNavbarLinks />}
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
      pb="8px"
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
