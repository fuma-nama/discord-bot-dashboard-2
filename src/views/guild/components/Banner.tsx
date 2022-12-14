import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/react';
import BannerImg from 'assets/Banner1.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useColors } from 'theme';

export function Banner() {
  const { brand } = useColors();
  const { guild } = useParams();
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      p={{ base: 5, lg: 8 }}
      rounded="2xl"
      color="white"
      bgColor={brand}
      bgImg={{ base: null, '3sm': BannerImg }}
      bgSize="cover"
      gap={3}
    >
      <Heading>Getting Started</Heading>
      <Text fontWeight="400" color="gray.300">
        Create your bot and type something
      </Text>
      <ButtonGroup>
        <Button
          leftIcon={<SettingsIcon />}
          color="white"
          bg="whiteAlpha.200"
          onClick={() => navigate(`/guilds/${guild}/settings`)}
        >
          Settings
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
