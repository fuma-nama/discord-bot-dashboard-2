import { Center, Link, Text } from '@chakra-ui/layout';
import { Button, Icon } from '@chakra-ui/react';
import { LoadingPanel } from 'components/panel/LoadingPanel';
import { QueryStatus } from 'components/panel/QueryPanel';
import { config } from 'config/common';
import { guild as view } from 'config/translations/guild';
import { BsMailbox } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useGuildInfoQuery } from 'stores';
import { useColors } from 'theme';
import { GuildPanel } from './GuildPanel';

export function GuildView() {
  const t = view.useTranslations();
  const { guild } = useParams();
  const query = useGuildInfoQuery(guild);

  return (
    <QueryStatus query={query} loading={<LoadingPanel size="sm" />} error={t.error.load}>
      {query.data != null ? <GuildPanel guild={guild} info={query.data} /> : <NotJoined />}
    </QueryStatus>
  );
}

function NotJoined() {
  const t = view.useTranslations();
  const { textColorSecondary } = useColors();

  return (
    <Center flexDirection="column" gap={3} h="full" p={5}>
      <Icon as={BsMailbox} w={50} h={50} />
      <Text fontSize="xl" fontWeight="600">
        {t.error['not found']}
      </Text>
      <Text textAlign="center" color={textColorSecondary}>
        {t.error['not found description']}
      </Text>
      <Link href={config.inviteUrl} target="_blank">
        <Button variant="brand" leftIcon={<FaRobot />}>
          {t.bn.invite}
        </Button>
      </Link>
    </Center>
  );
}
