import { WarningIcon } from '@chakra-ui/icons';
import { Center, Text, Box } from '@chakra-ui/react';
import { Slide } from '@chakra-ui/transition';
import { useColors } from '@omagize/ui/theme';
import { ReactNode } from 'react';
import { TagFlex } from '../card';

export function SaveBar({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  const { cardBg, textColorPrimary, shadow } = useColors();

  return (
    <Slide in={isOpen} direction="bottom">
      <Center mb="20px" zIndex="popover" px={5}>
        <TagFlex bg={cardBg} minW="fit-content" w="500px" shadow={shadow}>
          <WarningIcon w="40px" h="40px" color="orange.300" />
          <Text fontWeight="600" color={textColorPrimary}>
            Save Changes
          </Text>
          <Box ml="auto">{children}</Box>
        </TagFlex>
      </Center>
    </Slide>
  );
}
