import { Center, Link, Text } from '@chakra-ui/layout';
import { Button, Icon } from '@chakra-ui/react';
import { LoadingPanel } from 'components/panel/LoadingPanel';
import { QueryStatus } from 'components/panel/QueryPanel';
import { config } from 'config/common';
import { BsMailbox } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useGuildInfoQuery } from 'stores';
import { useColors } from 'theme';
import { GuildPanel } from './GuildPanel';

export function GuildView() {
  const { guild } = useParams();
  const query = useGuildInfoQuery(guild);

  return (
    <QueryStatus query={query} loading={<LoadingPanel size="sm" />} error="Failed to load Guild">
      {query.data != null ? <GuildPanel guild={guild} info={query.data} /> : <NotJoined />}
    </QueryStatus>
  );
}

function NotJoined() {
  const { textColorSecondary } = useColors();

  return (
    <Center flexDirection="column" gap={3} h="full" p={5}>
      <Icon as={BsMailbox} w={50} h={50} />
      <Text fontSize="xl" fontWeight="600">
        Where is it?
      </Text>
      <Text textAlign="center" color={textColorSecondary}>
        The bot can't access the server, let's invite him!
      </Text>
      <Link href={config.inviteUrl} target="_blank">
        <Button variant="brand" leftIcon={<FaRobot />}>
          Invite bot
        </Button>
      </Link>
    </Center>
  );
}
