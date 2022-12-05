// chakra imports
import { Box, Flex, Heading, Stack, VStack } from '@chakra-ui/react';
//   Custom components
import Links from './Items';
import SidebarCard from './SidebarCard';
import { SidebarItem } from 'utils/routeUtils';
import { GuildItem } from 'components/item/GuildItem';
import { useGuilds } from 'stores';
import { SearchBar } from 'components/fields/SearchBar';
import { useMemo, useState } from 'react';
import { config } from 'config/common';

function SidebarContent({
  items,
  selected: selectedGroup,
  onSelect,
}: {
  items: SidebarItem[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [filter, setFilter] = useState('');
  const guilds = useGuilds();

  const filteredGuilds = useMemo(
    () =>
      guilds.data?.filter((guild) => {
        const contains = guild.name.toLowerCase().includes(filter.toLowerCase());

        return config.guild.filter(guild) && contains;
      }),
    [guilds.data, filter]
  );

  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px" overflow="auto">
      <Flex alignItems="center" flexDirection="column" bg="brand.400" rounded="lg">
        <VStack align="center" my="32px" color="white">
          <Heading m={0}>{config.name}</Heading>
        </VStack>
      </Flex>
      <Stack direction="column" mt="18px" mb="auto">
        <Box ps="10px">
          <Links items={items} />
        </Box>
        <Box px="10px">
          <SearchBar
            w="full"
            input={{
              value: filter,
              onChange: (e) => setFilter(e.target.value),
            }}
          />
        </Box>
        <Flex direction="column" px="10px" gap={3}>
          {filteredGuilds?.map((guild) => (
            <GuildItem
              key={guild.id}
              guild={guild}
              active={selectedGroup === guild.id}
              onSelect={() => onSelect(guild.id)}
            />
          ))}
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
