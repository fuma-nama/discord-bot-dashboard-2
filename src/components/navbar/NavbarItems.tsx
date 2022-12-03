// Chakra Imports
import { Flex, FlexProps } from '@chakra-ui/react';
import { UserMenu } from 'components/menu/UserMenu';
import { SidebarTrigger } from 'components/SidebarTrigger';
import { ThemeSwitch } from 'components/ThemeSwitch';
import { useNavbarColors } from 'theme';

export default function AdminNavbarLinks() {
  return (
    <NavbarLinksBox>
      <NavbarDefaultItems />
    </NavbarLinksBox>
  );
}

export function NavbarDefaultItems() {
  const { iconColor, textColorPrimary, menuBg, shadow } = useNavbarColors();

  return (
    <>
      <SidebarTrigger />
      <ThemeSwitch color={iconColor} />
      <UserMenu color={textColorPrimary} shadow={shadow} bg={menuBg} />
    </>
  );
}

export function NavbarLinksBox(props: FlexProps) {
  // Chakra Color Mode
  const { menuBg, shadow } = useNavbarColors();

  return (
    <Flex
      justify="end"
      align="center"
      direction="row"
      bg={menuBg}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
      {...props}
    />
  );
}
