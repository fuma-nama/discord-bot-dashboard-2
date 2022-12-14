// Chakra imports
import {
  Flex,
  FormErrorMessage,
  FormLabel,
  Switch,
  SwitchProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FormCard, FormComponentProps, FormControlCard } from './Form';

export type SwitchFormProps = FormComponentProps<{
  value: boolean;
  onChange: (v: boolean) => void;
}>;

export function SwitchForm(props: SwitchFormProps) {
  return (
    <FormCard isRequired={props.required} isInvalid={props.error != null} {...props.baseControl}>
      <SwitchField
        label={props.label}
        desc={props.description}
        isChecked={props.value}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <FormErrorMessage>{props.error}</FormErrorMessage>
    </FormCard>
  );
}
// Custom components
export function SwitchField(
  props: {
    id?: string;
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
