import Icon from '@chakra-ui/icon';
import { Center, Flex, Heading, Text } from '@chakra-ui/layout';
import { LoadingPanel } from 'components/panel/LoadingPanel';
import { QueryStatus } from 'components/panel/QueryPanel';
import { config } from 'config/common';
import { CustomFeatures } from 'config/custom-types';
import { Feature } from 'config/types';
import { BsSearch } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useFeatureQuery } from 'stores';
import { useColors } from 'theme';

type Params = {
  guild: string;
  feature: keyof CustomFeatures;
};

export function FeatureView() {
  const { guild, feature } = useParams<Params>();
  const query = useFeatureQuery(guild, feature);
  const featureConfig = config.guild.features[feature] as Feature<typeof feature>;
  const skeleton = featureConfig?.useSkeleton();

  if (featureConfig == null) return <NotFound />;

  return (
    <Flex direction="column" minH="full">
      <QueryStatus
        query={query}
        loading={skeleton ?? <LoadingPanel size="sm" flex={1} />}
        error="Failed to load feature"
      >
        <Heading>{featureConfig.name}</Heading>
        <Content id={feature} feature={query.data} config={featureConfig} />
      </QueryStatus>
    </Flex>
  );
}

function NotFound() {
  const { textColorSecondary } = useColors();
  return (
    <Center flexDirection="column" gap={2} h="full">
      <Icon as={BsSearch} w="50px" h="50px" />
      <Heading size="lg">Not Found</Heading>
      <Text color={textColorSecondary}>Hmm... Weird we can't find it</Text>
    </Center>
  );
}

function Content<K extends keyof CustomFeatures>({
  feature,
  config,
}: {
  id: K;
  feature: CustomFeatures[K];
  config: Feature<K>;
}) {
  const render = config.useRender(feature);

  return <>{render}</>;
}
