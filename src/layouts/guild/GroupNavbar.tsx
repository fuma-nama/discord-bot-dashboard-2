import { HStack, Text } from '@chakra-ui/layout';
import { Avatar, SkeletonCircle } from '@chakra-ui/react';
import { iconUrl } from 'api/discord';
import { NavbarBox } from 'components/navbar/Navbar';
import { NavbarDefaultItems, NavbarLinksBox } from 'components/navbar/NavbarItems';
import { useGuildPreview, useGuilds, useSelectedGuild } from 'stores';

export function GroupNavbar() {
  const { selected, setSelected } = useSelectedGuild();
  const { guild } = useGuildPreview(selected);

  return (
    <NavbarBox box={{ maxW: { base: 'none', xl: '1200px' } }} bar={{ direction: 'row' }}>
      <HStack cursor="pointer" onClick={() => setSelected(selected)}>
        {guild == null ? <SkeletonCircle /> : <Avatar name={guild?.name} src={iconUrl(guild)} />}
        <Text fontWeight="600">{guild?.name}</Text>
      </HStack>
      <NavbarLinksBox>
        <NavbarDefaultItems />
      </NavbarLinksBox>
    </NavbarBox>
  );
}
