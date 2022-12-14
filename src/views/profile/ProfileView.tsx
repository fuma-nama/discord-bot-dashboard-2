import { Flex, Grid, Spacer, Text, VStack } from '@chakra-ui/layout';
import { Avatar, Button, Card, CardBody, CardHeader, Image, useColorMode } from '@chakra-ui/react';
import { avatarUrl, bannerUrl } from 'api/discord';
import { SwitchField } from 'components/forms/SwitchField';
import { IoLogOut } from 'react-icons/io5';
import { useLogoutMutation, usePageStore, useSelfUser } from 'stores';
import { useColors } from 'theme';

/**
 * User info and general settings here
 */
export function ProfileView() {
  const user = useSelfUser();
  const { cardBg } = useColors();
  const { colorMode, setColorMode } = useColorMode();
  const [devMode, setDevMode] = usePageStore((s) => [s.devMode, s.setDevMode]);
  const logout = useLogoutMutation();

  return (
    <Grid templateColumns={{ base: '1fr', md: 'minmax(0, 800px) auto' }} gap={3}>
      <Flex direction="column" maxW="800px" p={2} pl={0}>
        <Image src={bannerUrl(user)} rounded="2xl" />
        <VStack mt="-50px" ml="40px" align="start">
          <Avatar
            src={avatarUrl(user)}
            name={user.username}
            w="100px"
            h="100px"
            ringColor={cardBg}
            ring="6px"
          />
          <Text fontWeight="600" fontSize="2xl">
            {user.username}
          </Text>
        </VStack>
      </Flex>
      <Card w="full" rounded="3xl" h="fit-content">
        <CardHeader fontSize="2xl">Settings</CardHeader>
        <CardBody as={Flex} direction="column" gap={3} mt={3}>
          <SwitchField
            id="dark-mode"
            label="Dark Mode"
            desc="Enables dark theme in order to protect your eyes"
            isChecked={colorMode === 'dark'}
            onChange={(e) => setColorMode(e.target.checked ? 'dark' : 'light')}
          />
          <SwitchField
            id="developer-mode"
            label="Developer Mode"
            desc="Used for debugging and testing"
            isChecked={devMode}
            onChange={(e) => setDevMode(e.target.checked)}
          />
          <Spacer mt="100px" />
          <Button
            leftIcon={<IoLogOut />}
            variant="danger"
            isLoading={logout.isLoading}
            onClick={() => logout.mutate()}
          >
            Logout
          </Button>
        </CardBody>
      </Card>
      <Content />
    </Grid>
  );
}

function Content() {
  return <></>;
}
