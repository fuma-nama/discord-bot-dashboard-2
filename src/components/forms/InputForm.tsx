import { FormLabel } from '@chakra-ui/form-control';
import { Input, InputProps } from '@chakra-ui/react';
import { FormCard } from './FormCard';

export type InputFormProps = {
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  input?: InputProps;
};

export function InputForm({ label, required, ...props }: InputFormProps) {
  return (
    <FormCard isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <Input
        variant="main"
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        placeholder={props.placeholder}
        {...props.input}
      />
    </FormCard>
  );
}
