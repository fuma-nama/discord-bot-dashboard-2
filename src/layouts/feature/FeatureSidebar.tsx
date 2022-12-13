import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { HSeparator } from 'components/layout/Separator';
import { getFeatures, IdFeature } from 'config/utils';
import { BottomCard } from 'layouts/sidebar/components/SidebarContent';
import { useNavigate, useParams } from 'react-router-dom';
import { useGuildPreview, useSelectedGuild } from 'stores';
import { useColors } from 'theme';

export function FeatureSidebar() {
  const { selected } = useSelectedGuild();
  const navigate = useNavigate();
  const { guild } = useGuildPreview(selected);

  return (
    <Flex direction="column" h="full" overflow="auto">
      <Flex direction="column" gap={2} p={3}>
        <HStack cursor="pointer" mb={2} onClick={() => navigate(`/guilds/${selected}`)}>
          <IconButton icon={<ChevronLeftIcon />} aria-label="back" />
          <Text fontSize="lg" fontWeight="600">
            {guild?.name}
          </Text>
        </HStack>
        <VStack align="stretch">
          <HSeparator>Features</HSeparator>
          {getFeatures().map((feature) => (
            <FeatureItem key={feature.id} feature={feature} />
          ))}
        </VStack>
      </Flex>
      <Spacer />
      <BottomCard />
    </Flex>
  );
}

function FeatureItem({ feature }: { feature: IdFeature }) {
  const { globalBg, brand, textColorPrimary } = useColors();
  const { guild, feature: activeId } = useParams();
  const active = activeId === feature.id;
  const navigate = useNavigate();

  return (
    <HStack
      rounded="xl"
      p={3}
      color={active ? 'white' : textColorPrimary}
      bg={active ? brand : globalBg}
      cursor="pointer"
      onClick={() => navigate(`/guilds/${guild}/features/${feature.id}`)}
    >
      {feature.icon}
      <Text fontSize="lg" fontWeight="600">
        {feature.name}
      </Text>
    </HStack>
  );
}
