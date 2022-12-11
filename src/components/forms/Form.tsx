import { FormControl, FormControlProps, FormLabel } from '@chakra-ui/form-control';
import { Flex, Spacer, Text } from '@chakra-ui/layout';
import { ComponentProps, JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { useColors } from 'theme';
import { DatePickerForm } from './DatePicker';
import { Memoize } from './FormComponent';
import { InputForm } from './InputForm';

export function FormCard(props: FormControlProps) {
  const { cardBg } = useColors();

  return <FormControl bg={cardBg} rounded="3xl" p={4} {...props} />;
}

export type FormControlCardProps = {
  label?: string;
  description?: string;
  required?: boolean;
  form?: FormControlProps;
  children: ReactNode;
};

export type FormComponentProps<V> = V & Omit<FormControlCardProps, keyof V | 'children'>;

export function FormControlCard({
  label,
  description,
  required,
  form,
  children,
}: FormControlCardProps) {
  const { cardBg, textColorSecondary } = useColors();

  return (
    <FormControl
      as={Flex}
      direction="column"
      bg={cardBg}
      rounded="3xl"
      p={4}
      isRequired={required}
      {...form}
    >
      <FormLabel
        fontSize={{ base: 'lg', lg: 'xl' }}
        fontWeight={{ base: '600', lg: 'bold' }}
        mb={0}
      >
        {label}
      </FormLabel>
      <Text color={textColorSecondary}>{description}</Text>
      <Spacer mt={1} />
      {children}
    </FormControl>
  );
}

export type FormInput<C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  ComponentProps<C> & {
    as: C;
  };
export function form(...inputs: ReactElement[]) {
  return <>{inputs}</>;
}

export function item<C extends JSXElementConstructor<any> | keyof JSX.IntrinsicElements>(
  input: FormInput<C>
) {
  const { as, ...props } = input;

  return <Memoize as={as} {...props} />;
}
