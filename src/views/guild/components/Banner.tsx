import { Flex, Heading, Text } from '@chakra-ui/layout';
import BannerImg from 'assets/Banner1.png';
import { useColors } from 'theme';
export function Banner() {
  const { brand } = useColors();

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
    </Flex>
  );
}
