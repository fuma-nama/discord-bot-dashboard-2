// Chakra imports
import { Flex, FormLabel, Switch, SwitchProps, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
export function SwitchField(
  props: {
    id: string;
    label?: string;
    desc?: string;
  } & SwitchProps
) {
  const { id, label, desc, ...rest } = props;

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Flex justify="space-between" align="center" borderRadius="16px" gap={3}>
      <FormLabel htmlFor={id} _hover={{ cursor: 'pointer' }} flexDirection="column">
        <Text color={textColorPrimary} fontSize="md" fontWeight="600">
          {label}
        </Text>
        <Text color="secondaryGray.600" fontSize="md">
          {desc}
        </Text>
      </FormLabel>
      <Switch id={id} variant="main" size="md" {...rest} />
    </Flex>
  );
}
