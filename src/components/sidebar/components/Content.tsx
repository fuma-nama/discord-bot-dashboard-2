// chakra imports
import { Box, Flex, Heading, Stack, VStack } from '@chakra-ui/react';
//   Custom components
import Links from './Items';
import SidebarCard from './SidebarCard';
import { SidebarItem } from 'utils/routeUtils';
import ActionBar from './ActionBar';
import { GuildItem } from 'components/item/GuildItem';
import { useGuilds } from 'stores';

function SidebarContent({
  items,
  selected: selectedGroup,
  onSelect,
}: {
  items: SidebarItem[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const guilds = useGuilds();

  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px" overflow="auto">
      <Flex alignItems="center" flexDirection="column" bg="brand.400" rounded="lg">
        <VStack align="center" my="32px" color="white">
          <Heading m={0}>Omagize</Heading>
        </VStack>
      </Flex>
      <Stack direction="column" mt="18px" mb="auto">
        <Box ps="10px">
          <Links items={items} />
        </Box>
        <Box px="10px">
          <ActionBar />
        </Box>
        <Flex direction="column" px="10px" gap={3}>
          {guilds != null ? (
            guilds.data?.map((guild) => (
              <GuildItem
                key={guild.id}
                guild={guild}
                active={selectedGroup === guild.id}
                onSelect={() => onSelect(guild.id)}
              />
            ))
          ) : (
            <></>
          )}
        </Flex>
      </Stack>

      <Box
        pos="sticky"
        bottom={0}
        ps="20px"
        pe={{ lg: '16px', '2xl': '20px' }}
        mt="60px"
        mb="40px"
        borderRadius="30px"
      >
        <SidebarCard />
      </Box>
    </Flex>
  );
}

export default SidebarContent;
