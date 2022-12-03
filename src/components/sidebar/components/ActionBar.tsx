import { Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export default function ActionBar() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button w="full" leftIcon={<AddIcon />} onClick={onOpen} mb={3}>
        Add Group
      </Button>
    </>
  );
}
