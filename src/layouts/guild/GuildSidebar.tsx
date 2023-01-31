import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa';
import { Flex, HStack, StackProps, Text, VStack } from '@chakra-ui/layout';
import { Icon, IconButton } from '@chakra-ui/react';
import { HSeparator } from 'components/layout/Separator';
import { getFeatures, IdFeature } from 'config/utils';
import { IoSettings } from 'react-icons/io5';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGuildPreview, useSelectedGuild } from 'stores';
import { show, useColors } from 'theme';
import { guild as view } from 'config/translations/guild';

export function InGuildSidebar() {
  const { selected } = useSelectedGuild();
  const navigate = useNavigate();
  const location = useLocation();
  const { guild } = useGuildPreview(selected);
  const t = view.useTranslations();

  return (
    <Flex direction="column" gap={2} p={3}>
      <HStack cursor="pointer" mb={2} onClick={() => navigate(`/guilds/${selected}`)}>
        <IconButton
          display={{ base: 'none', [show.sidebar]: 'block' }}
          icon={<Icon verticalAlign="middle" as={ChevronLeftIcon} />}
          aria-label="back"
        />
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
          {t.bn.settings}
        </Text>
      </CardItem>
      <VStack align="stretch">
        <HSeparator>Features</HSeparator>
        {getFeatures().map((feature) => (
          <FeatureItem key={feature.id} feature={feature} />
        ))}
      </VStack>
    </Flex>
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
