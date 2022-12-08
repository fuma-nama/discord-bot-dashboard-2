import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Center, Circle, Flex, Grid, Heading, HStack, Text } from '@chakra-ui/layout';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Hide,
  Icon,
  IconButton,
  Image,
  Progress,
} from '@chakra-ui/react';
import { BsMusicNoteBeamed, BsPause, BsPlay, BsPlayBtn } from 'react-icons/bs';
import { MdVoiceChat } from 'react-icons/md';
import { useColors, useColorsExtend, useItemHoverBg } from 'theme';

export function DashboardView() {
  const { globalBg } = useColors();

  return (
    <Flex direction="column" gap={5} maxW={{ lg: '1400px' }} mx="auto">
      <Card rounded="2xl" bg="brand.300">
        <CardHeader color="white" fontSize="2xl" fontWeight="bold">
          Invite our Bot
        </CardHeader>
        <CardBody>
          <Text color="whiteAlpha.800">Try our discord bot with one-click</Text>
        </CardBody>
        <CardFooter>
          <Button>Invite now</Button>
        </CardFooter>
      </Card>
      <MusicPlayer />
      <Grid templateColumns={{ base: '1fr', lg: '0.5fr 1fr' }} gap={3}>
        <Card rounded="3xl">
          <CardBody as={Center} p={4} flexDirection="column" gap={3}>
            <Circle p={4} bg={globalBg}>
              <Icon as={BsMusicNoteBeamed} w="80px" h="80px" />
            </Circle>

            <Text fontWeight="600">Create a voice channel</Text>
          </CardBody>
        </Card>
        <Card rounded="2xl">
          <CardHeader fontSize="xl" fontWeight="600">
            Created Voice channels
          </CardHeader>
          <CardBody as={Flex} direction="column" gap={3}>
            <VoiceChannelItem />
            <VoiceChannelItem />
            <VoiceChannelItem />
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

function MusicPlayer() {
  const { cardBg, textColorSecondary } = useColors();

  return (
    <Flex direction="row" gap={3}>
      <Hide below="md">
        <Image
          rounded="xl"
          src="https://cdns-images.dzcdn.net/images/artist/61bcbf8296b1669499064406c534d39d/500x500.jpg"
          maxW="200px"
          maxH="200px"
        />
      </Hide>

      <Flex w="full" direction="column" bg={cardBg} rounded="xl" gap={3} p={3}>
        <HStack color={textColorSecondary}>
          <BsPlayBtn />
          <Text>Now Playing</Text>
        </HStack>
        <HStack>
          <Avatar name="Stay with me" size="sm" />
          <Text fontSize="2xl" fontWeight="bold">
            ZUTOMAYO - Stay with me
          </Text>
        </HStack>

        <HStack mt="auto" justify="space-between" fontWeight="bold">
          <IconButton
            fontSize="4xl"
            icon={<ChevronLeftIcon />}
            aria-label="previous"
            variant="action"
          />
          <IconButton
            p={1}
            h="fit-content"
            fontSize="4xl"
            icon={<BsPlay />}
            aria-label="pause"
            variant="brand"
            rounded="full"
          />
          <IconButton
            fontSize="4xl"
            icon={<ChevronRightIcon />}
            aria-label="next"
            variant="action"
          />
        </HStack>
        <HStack px={3}>
          <Text>1:28</Text>
          <Progress w="full" value={50} />
        </HStack>
      </Flex>
    </Flex>
  );
}

function VoiceChannelItem() {
  const hover = useItemHoverBg();
  const { cardBg, iconBg } = useColorsExtend(
    {
      cardBg: 'transparent',
      iconBg: 'blackAlpha.100',
    },
    {
      cardBg: 'navy.700',
      iconBg: 'blackAlpha.500',
    }
  );

  return (
    <Card bg={cardBg} _hover={hover}>
      <CardHeader as={HStack}>
        <Circle bg={iconBg} p={2}>
          <Icon as={MdVoiceChat} w="30px" h="30px" color="green.500" />
        </Circle>
        <Text>My Channel</Text>
      </CardHeader>
    </Card>
  );
}
