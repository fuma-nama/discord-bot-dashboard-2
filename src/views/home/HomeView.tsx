import { Center, Flex, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import { Card, CardBody, CardFooter, CardHeader, Icon, Image, Select } from '@chakra-ui/react';
import { config } from 'config/common';
import { BsEmojiAngryFill, BsPeopleFill, BsSafe } from 'react-icons/bs';
import { IoEarth, IoPeopleCircle } from 'react-icons/io5';
import { MdMusicNote } from 'react-icons/md';
import { useColorsExtend } from 'theme';
import WorldSvg from 'assets/World.svg';
import { useSettingsStore } from 'stores';
import { languages, home, names } from 'config/translations';
import { SelectField } from 'components/forms/SelectField';

const features = [
  {
    name: <home.T text="music" />,
    description: 'Play music anywhere',
    icon: <MdMusicNote />,
  },
  {
    name: 'Reaction Role',
    description: 'Give user a role when clicking on a button or reaction',
    icon: <BsPeopleFill />,
  },
  {
    name: 'Auto Moderator',
    description: 'Keep your server safe and clean',
    icon: <BsSafe />,
  },
];

const servers = [
  {
    name: 'Anime Community',
    logo: IoPeopleCircle,
    members: 50000,
  },
  {
    name: 'Memes World',
    logo: BsEmojiAngryFill,
    members: 3000,
  },
];

export function HomeView() {
  const [lang, setLang] = useSettingsStore((s) => [s.lang, s.setLang]);
  const { globalBg, textColorSecondary, brand } = useColorsExtend(
    {
      brand: 'cyan.400',
    },
    {
      brand: 'cyan.400',
    }
  );

  return (
    <Flex w="full" direction="column" gap={3} bg={globalBg}>
      <Flex direction="column">
        <Heading
          fontSize={{ base: '3xl', '2xl': '5xl' }}
          bgGradient={`linear(to-l, blue.200, ${brand})`}
          bgClip="text"
        >
          Next-gen Discord Bot
        </Heading>
        <Heading fontSize={{ base: '5xl', xl: '7xl' }}>{config.name}</Heading>
      </Flex>
      <SelectField
        value={{
          label: names[lang],
          value: lang,
        }}
        onChange={(e) => setLang(e.value)}
        options={languages.map(({ name, key }) => ({
          label: name,
          value: key,
        }))}
        placeholder="Select your language"
      ></SelectField>

      <SimpleGrid columns={{ base: 1, '3sm': 2, xl: 3 }} mt="3rem" gap={2}>
        {features.map((feature, i) => (
          <Card key={i}>
            <CardHeader fontSize="2xl" fontWeight="600" pb={1}>
              {feature.name}
            </CardHeader>
            <CardBody py={0} color={textColorSecondary}>
              {feature.description}
            </CardBody>
            <CardFooter>{feature.icon}</CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      <Image src={WorldSvg} h="65px" objectFit="cover" />
      <HStack>
        <Icon as={IoEarth} w={50} h={50} color={brand} />
        <Heading fontSize={{ base: '2xl', xl: '3xl', '2xl': '4xl' }}>
          Trusted by{' '}
          <Text color="pink.400" as="span">
            15000+
          </Text>{' '}
          servers
        </Heading>
      </HStack>
      <SimpleGrid columns={{ base: 1, '3sm': 2 }} gap={5} mt={5}>
        {servers.map((server, i) => (
          <Card key={i} rounded="xl">
            <CardBody as={Flex} direction="row" gap={3}>
              <Center bg={brand} rounded="lg" p={4}>
                <Icon as={server.logo} w={30} h={30} />
              </Center>
              <Flex direction="column" gap={2}>
                <Text fontSize="xl" fontWeight="bold">
                  {server.name}
                </Text>
                <HStack color={textColorSecondary}>
                  <BsPeopleFill />
                  <Text>{server.members}</Text>
                </HStack>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
