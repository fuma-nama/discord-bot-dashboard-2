import { Center, Flex, Text } from '@chakra-ui/layout';
import { Card, CardBody, Switch } from '@chakra-ui/react';
import { IdFeature } from 'config/utils';
import { useNavigate } from 'react-router-dom';
import { useUpdateFeatureMutation } from 'stores';
import { useColors, useItemHoverBg } from 'theme';

export function FeatureItem({
  guild,
  feature,
  enabled,
}: {
  guild: string;
  feature: IdFeature;
  enabled: boolean;
}) {
  const navigate = useNavigate();
  const { textColorSecondary, brand, globalBg } = useColors();
  const hovered = useItemHoverBg();
  const mutation = useUpdateFeatureMutation(guild, feature.id);

  return (
    <Card
      _hover={enabled && hovered}
      onClick={() => {
        if (enabled) navigate(`/guilds/${guild}/features/${feature.id}`);
      }}
    >
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
          disabled={mutation.isLoading}
          h="fit-content"
          isChecked={enabled}
          onChange={(e) => mutation.mutate({ enabled: e.target.checked })}
          onMouseDown={(e) => e.preventDefault()}
        />
      </CardBody>
    </Card>
  );
}
