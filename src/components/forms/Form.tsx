import { FormControl, FormControlProps, FormLabel } from '@chakra-ui/form-control';
import { Flex, Spacer, Text } from '@chakra-ui/layout';
import { ReactNode } from 'react';
import { useColors } from 'theme';

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
