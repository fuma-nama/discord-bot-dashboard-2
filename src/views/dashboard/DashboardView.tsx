import { Center, Heading, Text, VStack } from '@chakra-ui/layout';
import { Button, Card, CardBody, CardFooter, CardHeader, Icon } from '@chakra-ui/react';
import { config } from 'config/common';
import { FaRobot } from 'react-icons/fa';
import { useSelfUser } from 'stores';

export function DashboardView() {
  const hook = config.pages?.useDashboard();

  if (hook == null) return <DefaultView />;
  return <>{hook}</>;
}

function DefaultView() {
  const user = useSelfUser();

  return (
    <Center h="full" flexDirection="column" textAlign="center" p={3}>
      <Heading size={{ base: 'md', '3sm': 'lg' }}>Welcome back, {user.username}</Heading>
      <Card rounded="2xl" p={10} pb={5}>
        <CardHeader as={VStack}>
          <Icon as={FaRobot} w="60px" h="60px" />
          <Text>Invite our Bot Now!</Text>
        </CardHeader>
        <CardFooter>
          <Button variant="action" w="full">
            Invite
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}
