import { HStack, Text } from '@chakra-ui/layout';
import { Avatar, SkeletonCircle } from '@chakra-ui/react';
import { iconToUrl } from 'api/discord';
import { NavbarBox } from 'components/navbar/Navbar';
import { NavbarDefaultItems, NavbarLinksBox } from 'components/navbar/NavbarItems';
import { useGuild, useGuilds, useSelectedGuild } from 'stores';

export function GroupNavbar() {
  const { selected } = useSelectedGuild();
  const query = useGuilds();

  const guild = query.data?.find((guild) => guild.id === selected);
  return (
    <NavbarBox>
      <HStack>
        {guild == null ? (
          <SkeletonCircle />
        ) : (
          <Avatar name={guild?.name} src={iconToUrl(guild.id, guild.name)} />
        )}
        <Text fontWeight="600">{guild?.name}</Text>
      </HStack>
      <NavbarLinksBox>
        <NavbarDefaultItems />
      </NavbarLinksBox>
    </NavbarBox>
  );
}
