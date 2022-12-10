import Icon from '@chakra-ui/icon';
import { WarningIcon } from '@chakra-ui/icons';
import { Center, Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup, SlideFade } from '@chakra-ui/react';
import { LoadingPanel } from 'components/panel/LoadingPanel';
import { QueryStatus } from 'components/panel/QueryPanel';
import { config } from 'config/common';
import { CustomFeatures } from 'config/custom-types';
import { FeatureConfig, FeatureRender } from 'config/types';
import { BsSearch } from 'react-icons/bs';
import { IoSave } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { useFeatureQuery, useUpdateFeatureMutation } from 'stores';
import { useColors } from 'theme';

type Params = {
  guild: string;
  feature: keyof CustomFeatures;
};

export type UpdateFeatureValue<K extends keyof CustomFeatures> = Partial<CustomFeatures[K]>;

export function FeatureView() {
  const { guild, feature } = useParams<Params>();
  const query = useFeatureQuery(guild, feature);
  const featureConfig = config.guild.features[feature] as FeatureConfig<typeof feature>;
  const skeleton = featureConfig?.useSkeleton?.();

  if (featureConfig == null) return <NotFound />;

  return (
    <QueryStatus
      query={query}
      loading={skeleton ?? <LoadingPanel size="sm" />}
      error="Failed to load feature"
    >
      <Content id={feature} feature={query.data} config={featureConfig} />
    </QueryStatus>
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
  config: FeatureConfig<K>;
}) {
  const result = config.useRender(feature);

  return (
    <Flex direction="column" w="full" h="full">
      <Flex direction="column" flex={1}>
        <Heading>{config.name}</Heading>
        {result.component}
      </Flex>
      <Savebar result={result} />
    </Flex>
  );
}

function Savebar({ result: { serialize, canSave, reset } }: { result: FeatureRender }) {
  const { guild, feature } = useParams<Params>();
  const { cardBg } = useColors();
  const mutation = useUpdateFeatureMutation();

  const onSave = () => {
    mutation.mutate(
      {
        guild,
        feature,
        options: serialize(),
      },
      {
        onSuccess: reset,
      }
    );
  };

  return (
    <SlideFade in={canSave}>
      <HStack bg={cardBg} rounded="3xl" pos="sticky" left={0} bottom={0} w="full" px={5} py={3}>
        <WarningIcon
          _light={{ color: 'orange.400' }}
          _dark={{ color: 'orange.300' }}
          w="30px"
          h="30px"
        />
        <Text fontSize="lg" fontWeight="500">
          Save changes
        </Text>
        <Spacer />
        <ButtonGroup isDisabled={mutation.isLoading}>
          <Button
            variant="brand"
            leftIcon={<IoSave />}
            isLoading={mutation.isLoading}
            onClick={onSave}
          >
            Save
          </Button>
          <Button onClick={reset}>Discard</Button>
        </ButtonGroup>
      </HStack>
    </SlideFade>
  );
}
