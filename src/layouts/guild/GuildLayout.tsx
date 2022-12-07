import { Box, Center } from '@chakra-ui/layout';
import { Outlet } from 'react-router-dom';

export function GuildLayout() {
  return (
    <Center w="full">
      <Box w="full" maxW={{ base: 'none', xl: '1200px' }}>
        <Outlet />
      </Box>
    </Center>
  );
}
