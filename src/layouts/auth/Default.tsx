// Chakra imports
import { Box, Center, Flex, Grid, Heading, HStack, Text } from '@chakra-ui/react';
import { FooterAdmin, OmagizeLogo, ThemeToggle } from '@omagize/ui/components';
import { useColors } from '@omagize/ui/theme';

function AuthIllustration(props: {
  children: JSX.Element | string;
  illustrationBackground: string;
}) {
  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    <Grid
      position="relative"
      minH="full"
      templateColumns={{ base: '1fr', lg: '1fr 1fr', xl: '1fr 0.8fr' }}
    >
      <Flex w="full" p={{ base: '30px', xl: '50px' }} justifyContent="start" direction="column">
        <HStack>
          <OmagizeLogo w={8} h={8} />
          <Text fontWeight="600">Omagize</Text>
        </HStack>
        <Box mx="auto" flex={1} mt={{ base: '40px', md: '14vh' }} mb="120px">
          {children}
        </Box>
      </Flex>
      <AuthImage image={illustrationBackground} />
      <Center pos="absolute" bottom={{ base: '15px', xl: '30px' }} w="full">
        <Box w="1313px" maxW="full" px="30px">
          <FooterAdmin />
        </Box>
      </Center>
      <ThemeToggle />
    </Grid>
  );
}

function AuthImage({ image }: { image: string }) {
  const { brand } = useColors();

  return (
    <Center
      display={{ base: 'none', lg: 'flex' }}
      flexDirection="column"
      h="full"
      bg={brand}
      p={30}
      borderBottomLeftRadius="200px"
      color="white"
    >
      <OmagizeLogo w="80%" h="auto" />
      <Heading mt="-20" mx="auto">
        Omagize
      </Heading>
    </Center>
  );
}

export default AuthIllustration;
