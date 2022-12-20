import { ChevronLeftIcon } from '@chakra-ui/icons';
import { HStack, Text } from '@chakra-ui/layout';
import { Avatar, IconButton, SkeletonCircle } from '@chakra-ui/react';
import { iconUrl } from 'api/discord';
import { NavbarBox } from 'components/navbar/Navbar';
import { NavbarDefaultItems, NavbarLinksBox } from 'components/navbar/NavbarItems';
import { useGuildPreview, useSelectedGuild } from 'stores';
import { show } from 'theme';

export function GroupNavbar({ back }: { back?: boolean }) {
  const { selected, setSelected } = useSelectedGuild();
  const { guild } = useGuildPreview(selected);

  return (
    <NavbarBox bar={{ direction: 'row' }}>
      <HStack cursor="pointer" onClick={() => setSelected(selected)}>
        {back && (
          <IconButton
            display={{ [show.sidebar]: 'none' }}
            aria-label="back"
            icon={<ChevronLeftIcon />}
            onClick={() => setSelected(selected)}
          />
        )}
        {guild == null ? <SkeletonCircle /> : <Avatar name={guild?.name} src={iconUrl(guild)} />}
        <Text fontWeight="600">{guild?.name}</Text>
      </HStack>
      <NavbarLinksBox>
        <NavbarDefaultItems />
      </NavbarLinksBox>
    </NavbarBox>
  );
}
