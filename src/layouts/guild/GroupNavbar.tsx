import { HStack, Text } from '@chakra-ui/layout';
import { Avatar, SkeletonCircle } from '@chakra-ui/react';
import { iconUrl } from 'api/discord';
import { NavbarBox } from 'components/navbar/Navbar';
import { NavbarDefaultItems, NavbarLinksBox } from 'components/navbar/NavbarItems';
import { useGuilds, useSelectedGuild } from 'stores';

export function GroupNavbar() {
  const { selected } = useSelectedGuild();
  const query = useGuilds();

  const guild = query.data?.find((guild) => guild.id === selected);
  return (
    <NavbarBox bar={{ direction: 'row' }}>
      <HStack>
        {guild == null ? <SkeletonCircle /> : <Avatar name={guild?.name} src={iconUrl(guild)} />}
        <Text fontWeight="600">{guild?.name}</Text>
      </HStack>
      <NavbarLinksBox>
        <NavbarDefaultItems />
      </NavbarLinksBox>
    </NavbarBox>
  );
}
