import Icon from '@chakra-ui/icon';
import { Center, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { LoadingPanel } from 'components/panel/LoadingPanel';
import { QueryStatus } from 'components/panel/QueryPanel';
import { CustomFeatures } from 'config/types';
import { features } from 'config/features';
import { FeatureConfig } from 'config/types';
import { BsSearch } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useEnableFeatureMutation, useFeatureQuery } from 'stores';
import { useColors } from 'theme';
import { UpdateFeaturePanel } from './UpdateFeaturePanel';

export type Params = {
  guild: string;
  feature: keyof CustomFeatures;
};

export type UpdateFeatureValue<K extends keyof CustomFeatures> = Partial<CustomFeatures[K]>;

export function FeatureView() {
  const { guild, feature } = useParams<Params>();
  const query = useFeatureQuery(guild, feature);
  const featureConfig = features[feature] as FeatureConfig<typeof feature>;
  const skeleton = featureConfig?.useSkeleton?.();
  if (featureConfig == null) return <NotFound />;
  if (query.isError) return <NotEnabled />;

  return (
    <QueryStatus
      query={query}
      loading={skeleton ?? <LoadingPanel size="sm" />}
      error="Failed to load feature"
    >
      <UpdateFeaturePanel id={feature} feature={query.data} config={featureConfig} />
    </QueryStatus>
  );
}

function NotEnabled() {
  const { guild, feature } = useParams<Params>();
  const { textColorSecondary } = useColors();
  const enable = useEnableFeatureMutation(guild, feature);

  return (
    <Center flexDirection="column" h="full" gap={1}>
      <Text fontSize="xl" fontWeight="600">
        Not Enabled
      </Text>
      <Text color={textColorSecondary}>Try enable this feature?</Text>
      <Button
        mt={3}
        isLoading={enable.isLoading}
        onClick={() => enable.mutate({ enabled: true })}
        variant="brand"
      >
        Enable Feature
      </Button>
    </Center>
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
