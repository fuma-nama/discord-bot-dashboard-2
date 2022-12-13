import { Flex, Heading, SimpleGrid } from '@chakra-ui/layout';
import { CustomGuildInfo } from 'config/types';
import { getFeatures } from 'config/utils';
import { Banner } from './components/Banner';
import { FeatureItem } from './components/FeatureItem';

export function GuildPanel({ guild: id, info }: { guild: string; info: CustomGuildInfo }) {
  return (
    <Flex direction="column" gap={5}>
      <Banner />
      <Flex direction="column" gap={4} p={{ base: 0, '2sm': 3, md: 0 }}>
        <Heading fontSize="2xl">Features</Heading>
        <SimpleGrid minChildWidth="328px" gap={3}>
          {getFeatures().map((feature) => (
            <FeatureItem
              key={feature.id}
              guild={id}
              feature={feature}
              enabled={info.enabledFeatures.includes(feature.id)}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
