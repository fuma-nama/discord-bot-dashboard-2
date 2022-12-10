import { FormLabel } from '@chakra-ui/form-control';
import { Box, Fade, Flex, Grid, Input, SimpleGrid, VStack } from '@chakra-ui/react';
import { HexAlphaColorPicker, HexColorInput, HexColorPicker } from 'react-colorful';
import { ColorPickerBaseProps } from 'react-colorful/dist/types';
import { FormCard } from './FormCard';
import { useDebouncedCallback } from 'use-debounce';

export type ColorPickerProps = {
  /**
   * hex color
   */
  value: string;
  onChange: (color: string) => void;
  supportAlpha?: boolean;
};

export type ColorPickerFormProps = ColorPickerProps & {
  label: string;
};

export function ColorPickerForm({ label, ...props }: ColorPickerFormProps) {
  const onChange = useDebouncedCallback((value: string) => props.onChange(value), 100);

  return (
    <FormCard>
      <FormLabel>{label}</FormLabel>
      <SimpleGrid minChildWidth="200px" gap={2}>
        <Flex direction="column" gap={3}>
          <Box minH="150px" rounded="xl" bgColor={props.value} flex={1} />
          <Input
            mt="auto"
            as={HexColorInput}
            color={props.value}
            placeholder={props.value ?? 'Select a color'}
            onChange={props.onChange as any}
            variant="main"
          />
        </Flex>
        <ColorPicker {...props} onChange={onChange} />
      </SimpleGrid>
    </FormCard>
  );
}

export function ColorPicker({ value, onChange, supportAlpha }: ColorPickerProps) {
  const props: Partial<ColorPickerBaseProps<string>> = {
    color: value,
    onChange,
    style: {
      width: '100%',
    },
  };

  return supportAlpha ? <HexAlphaColorPicker {...props} /> : <HexColorPicker {...props} />;
}
