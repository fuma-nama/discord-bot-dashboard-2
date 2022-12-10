import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputProps } from '@chakra-ui/react';
import { useColors } from 'theme';

export type InputFormProps = {
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  input?: InputProps;
};
export function InputForm({ label, required, ...props }: InputFormProps) {
  const { cardBg } = useColors();
  return (
    <FormControl isRequired={required} rounded="3xl" bg={cardBg} p={4}>
      <FormLabel>{label}</FormLabel>
      <Input
        variant="main"
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        placeholder={props.placeholder}
        {...props.input}
      />
    </FormControl>
  );
}
