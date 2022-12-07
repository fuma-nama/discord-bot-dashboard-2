import { Box, Center } from '@chakra-ui/layout';
import { Outlet } from 'react-router-dom';

export function GuildLayout() {
  return (
    <Center w="full" h="full">
      <Box w="full" maxW={{ base: 'none', xl: '1200px' }} h="full">
        <Outlet />
      </Box>
    </Center>
  );
}
