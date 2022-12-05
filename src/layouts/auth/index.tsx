import { Outlet } from 'react-router-dom';
// Chakra imports
import { Box, Flex, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import { useColors } from 'theme';
import { config } from 'config/common';
import { ThemeSwitch } from 'components/ThemeSwitch';

// Custom Chakra theme
export default function AuthLayout() {
  // states and functions
  document.documentElement.dir = 'ltr';
  const { cardBg, textColorPrimary } = useColors();
  return (
    <Flex direction="column" h="full">
      <HStack w="full" bg={cardBg} px={{ base: 5, lg: 10 }} py={2}>
        {config.icon != null && <Icon color={textColorPrimary} as={config.icon} w={10} h={10} />}
        <Text fontWeight="600" fontSize="lg">
          {config.name}
        </Text>
        <Spacer />
        <ThemeSwitch />
      </HStack>
      <Box height="100%" position="relative" w="100%" overflow="auto" flex={1}>
        <Outlet />
      </Box>
    </Flex>
  );
}
