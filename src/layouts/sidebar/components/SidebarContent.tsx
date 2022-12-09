// chakra imports
import {
  Avatar,
  Box,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
//   Custom components
import Links from './Items';
import { SidebarItem } from 'utils/routeUtils';
import { GuildItem } from 'components/item/GuildItem';
import { useGuilds, useSelfUserQuery } from 'stores';
import { SearchBar } from 'components/forms/SearchBar';
import { useMemo, useState } from 'react';
import { config } from 'config/common';
import { SettingsIcon } from '@chakra-ui/icons';
import { avatarUrl } from 'api/discord';
import { useNavigate } from 'react-router-dom';

export function SidebarContent({
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
    <Flex direction="column" height="100%" overflow="auto">
      <Flex alignItems="center" flexDirection="column" bg="brand.400">
        <VStack align="center" my="32px" color="white">
          <Heading m={0}>{config.name}</Heading>
        </VStack>
      </Flex>
      <Stack direction="column" mt="18px" mb="auto">
        <Flex direction="column" px="10px" gap={1}>
          <Links items={items.filter((item) => item.name !== '/user/settings')} />
        </Flex>
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
      <BottomCard />
    </Flex>
  );
}

function BottomCard() {
  const navigate = useNavigate();
  const user = useSelfUserQuery().data;
  if (user == null) return <></>;

  return (
    <Card pos="sticky" left={0} bottom={0} w="full" py={2}>
      <CardBody as={HStack}>
        <Avatar src={avatarUrl(user)} name={user.username} size="sm" />
        <Text fontWeight="600">{user.username}</Text>
        <Spacer />
        <IconButton
          icon={<SettingsIcon />}
          aria-label="settings"
          onClick={() => navigate('/user/settings')}
        />
      </CardBody>
    </Card>
  );
}
