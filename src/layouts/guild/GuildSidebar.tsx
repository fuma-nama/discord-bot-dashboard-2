import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex, HStack, Spacer, StackProps, Text, VStack } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { HSeparator } from 'components/layout/Separator';
import { getFeatures, IdFeature } from 'config/utils';
import { IoSettings } from 'react-icons/io5';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGuildPreview, useSelectedGuild } from 'stores';
import { useColors } from 'theme';

export function InGuildSidebar() {
  const { selected } = useSelectedGuild();
  const navigate = useNavigate();
  const location = useLocation();
  const { guild } = useGuildPreview(selected);

  return (
    <>
      <Flex direction="column" gap={2} p={3}>
        <HStack cursor="pointer" mb={2} onClick={() => navigate(`/guilds/${selected}`)}>
          <IconButton icon={<ChevronLeftIcon />} aria-label="back" />
          <Text fontSize="lg" fontWeight="600">
            {guild?.name}
          </Text>
        </HStack>
        <CardItem
          active={location.pathname === `/guilds/${selected}/settings`}
          onClick={() => navigate(`/guilds/${selected}/settings`)}
        >
          <IoSettings />
          <Text fontSize="lg" fontWeight="600">
            Settings
          </Text>
        </CardItem>
        <VStack align="stretch">
          <HSeparator>Features</HSeparator>
          {getFeatures().map((feature) => (
            <FeatureItem key={feature.id} feature={feature} />
          ))}
        </VStack>
      </Flex>
      <Spacer />
    </>
  );
}

function CardItem({ active, ...props }: { active: boolean } & StackProps) {
  const { globalBg, brand, textColorPrimary } = useColors();

  return (
    <HStack
      rounded="xl"
      p={3}
      color={active ? 'white' : textColorPrimary}
      bg={active ? brand : globalBg}
      cursor="pointer"
      {...props}
    />
  );
}

function FeatureItem({ feature }: { feature: IdFeature }) {
  const { guild, feature: activeId } = useParams();
  const active = activeId === feature.id;
  const navigate = useNavigate();

  return (
    <CardItem active={active} onClick={() => navigate(`/guilds/${guild}/features/${feature.id}`)}>
      {feature.icon}
      <Text fontSize="lg" fontWeight="600">
        {feature.name}
      </Text>
    </CardItem>
  );
}
