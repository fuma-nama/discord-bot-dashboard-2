import { Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useColors } from 'theme';

export default function ActionBar() {
  const { globalBg } = useColors();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button w="full" leftIcon={<AddIcon />} onClick={onOpen} mb={3} bg={globalBg}>
        Add Group
      </Button>
    </>
  );
}
