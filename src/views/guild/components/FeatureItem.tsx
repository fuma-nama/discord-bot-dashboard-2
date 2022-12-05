import { Center, Flex, Text } from '@chakra-ui/layout';
import { Card, CardBody, Switch } from '@chakra-ui/react';
import { Feature } from 'config/types';
import { useUpdateFeatureMutation } from 'stores';
import { useColors, useItemHoverBg } from 'theme';

export function FeatureItem({
  guild,
  feature,
  enabled,
}: {
  guild: string;
  feature: Feature;
  enabled: boolean;
}) {
  const { textColorSecondary, brand, globalBg } = useColors();
  const hovered = useItemHoverBg();
  const mutation = useUpdateFeatureMutation();

  return (
    <Card _hover={enabled && hovered}>
      <CardBody as={Flex} direction="row" gap={3}>
        <Center
          p={5}
          bg={enabled ? brand : globalBg}
          color={enabled && 'white'}
          rounded="xl"
          w="60px"
          h="60px"
        >
          {feature.icon}
        </Center>
        <Flex direction="column" flex={1}>
          <Text fontSize="xl" fontWeight="600">
            {feature.name}
          </Text>
          <Text color={textColorSecondary}>{feature.description}</Text>
        </Flex>
        <Switch
          h="fit-content"
          isChecked={enabled}
          onChange={(e) =>
            mutation.mutate({ guild, feature: feature.id, enabled: e.target.checked })
          }
        />
      </CardBody>
    </Card>
  );
}