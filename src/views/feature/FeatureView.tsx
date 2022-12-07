import { Center, Flex, Heading } from '@chakra-ui/layout';
import { config } from 'config/common';
import { CustomFeatures } from 'config/custom-types';
import { useParams } from 'react-router-dom';
import { useFeatureQuery } from 'stores';

type Params = {
  guild: string;
  feature: keyof CustomFeatures;
};
export function FeatureView() {
  const { guild, feature } = useParams<Params>();
  const query = useFeatureQuery(guild, feature);
  const featureConfig = config.guild.features[feature];

  if (featureConfig == null)
    return (
      <Center>
        <Heading>Not Found :(</Heading>
      </Center>
    );

  console.log(query.data);
  return (
    <Flex direction="column">
      <Heading>{featureConfig.name}</Heading>
    </Flex>
  );
}
