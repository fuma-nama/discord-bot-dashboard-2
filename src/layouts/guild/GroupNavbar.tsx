import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa';
import { HStack, Text } from '@chakra-ui/layout';
import { Avatar, Icon, IconButton, SkeletonCircle } from '@chakra-ui/react';
import { iconUrl } from 'api/discord';
import { NavbarBox } from 'components/navbar/Navbar';
import { NavbarDefaultItems, NavbarLinksBox } from 'components/navbar/NavbarItems';
import { useGuildPreview, useSelectedGuild } from 'stores';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import { show } from 'theme';

export function GroupNavbar({ back }: { back?: boolean }) {
  const { selected, setSelected } = useSelectedGuild();
  const { guild } = useGuildPreview(selected);

  return (
    <NavbarBox>
      <HStack cursor="pointer" onClick={() => setSelected(selected)}>
        <HorizontalCollapse in={back}>
          <IconButton
            display={{ [show.sidebar]: 'none' }}
            aria-label="back"
            icon={<Icon verticalAlign="middle" as={ChevronLeftIcon} />}
            onClick={() => setSelected(selected)}
          />
        </HorizontalCollapse>
        {guild == null ? (
          <SkeletonCircle />
        ) : (
          <Avatar
            name={guild?.name}
            src={iconUrl(guild)}
            display={{ base: 'none', [show.navbar]: 'block' }}
          />
        )}
        <Text fontWeight="600">{guild?.name}</Text>
      </HStack>
      <NavbarLinksBox>
        <NavbarDefaultItems />
      </NavbarLinksBox>
    </NavbarBox>
  );
}

export function HorizontalCollapse({
  in: isOpen,
  children,
}: {
  in: boolean;
  children: ReactElement;
}) {
  return (
    <motion.section
      animate={isOpen ? 'open' : 'collapsed'}
      exit="collapsed"
      variants={{
        open: { opacity: 1, width: 'auto' },
        collapsed: { opacity: 0, width: 0 },
      }}
      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
    >
      {children}
    </motion.section>
  );
}
