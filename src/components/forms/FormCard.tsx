import { FormControl, FormControlProps } from '@chakra-ui/form-control';
import { useColors } from 'theme';

export function FormCard(props: FormControlProps) {
  const { cardBg } = useColors();

  return <FormControl bg={cardBg} rounded="3xl" p={4} {...props} />;
}
