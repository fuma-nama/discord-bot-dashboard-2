import { WarningIcon } from '@chakra-ui/icons';
import { Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/layout';
import { ButtonGroup, Button } from '@chakra-ui/react';
import { SlideFade } from '@chakra-ui/transition';
import { CustomFeatures } from 'config/types';
import { FeatureConfig, FormRender } from 'config/types';
import { IoSave } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { useUpdateFeatureMutation } from 'stores';
import { useColors } from 'theme';
import { Params } from './FeatureView';

export function UpdateFeaturePanel<K extends keyof CustomFeatures>({
  feature,
  config,
}: {
  id: K;
  feature: CustomFeatures[K];
  config: FeatureConfig<K>;
}) {
  const result = config.useRender(feature);

  return (
    <>
      <Flex direction="column" w="full" h="full">
        <Flex direction="column" flex={1} gap={5}>
          <Heading>{config.name}</Heading>
          {result.component}
        </Flex>
      </Flex>
      <Savebar result={result} />
    </>
  );
}

function Savebar({ result: { serialize, canSave, reset, onSubmit } }: { result: FormRender }) {
  const { guild, feature } = useParams<Params>();
  const { cardBg } = useColors();
  const mutation = useUpdateFeatureMutation();

  const onSave = () => {
    //prevent submit if returns true
    if (onSubmit?.() === true) return;

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
    <HStack
      as={SlideFade}
      in={canSave}
      bg={cardBg}
      rounded="3xl"
      pos="sticky"
      bottom={2}
      w="full"
      px={5}
      py={3}
      mt={2}
      zIndex={3}
    >
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
  );
}
