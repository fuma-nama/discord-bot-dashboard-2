import { Outlet } from 'react-router-dom';
// Chakra imports
import { Box, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import { useColors } from 'theme';
import { config } from 'config/common';
import { ThemeSwitch } from 'components/ThemeSwitch';

// Custom Chakra theme
export default function AuthLayout() {
  // states and functions
  document.documentElement.dir = 'ltr';
  const { cardBg, textColorPrimary } = useColors();
  return (
    <Box h="full">
      <HStack w="full" bg={cardBg} px={{ base: 5, lg: 10 }} py={2}>
        <Icon color={textColorPrimary} as={config.icon} w={10} h={10} />
        <Text fontWeight="600" fontSize="lg">
          {config.name}
        </Text>
        <Spacer />
        <ThemeSwitch />
      </HStack>
      <Box
        float="right"
        minHeight="100vh"
        height="100%"
        position="relative"
        w="100%"
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
        overflow="auto"
      >
        <Outlet />
      </Box>
    </Box>
  );
}
