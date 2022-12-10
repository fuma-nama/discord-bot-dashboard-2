import { FormLabel } from '@chakra-ui/form-control';
import { Box, Flex, Grid, Input, VStack } from '@chakra-ui/react';
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
      <Flex direction="row" flexWrap="wrap" gap={3}>
        <Flex direction="column" gap={3} flex={1} minW="100px" minH="200px">
          <Box rounded="xl" bgColor={props.value} flex={1} />
          <Input
            as={HexColorInput}
            color={props.value}
            placeholder={props.value}
            onChange={props.onChange as any}
            variant="main"
          />
        </Flex>
        <ColorPicker {...props} onChange={onChange} />
      </Flex>
    </FormCard>
  );
}

export function ColorPicker({ value, onChange, supportAlpha }: ColorPickerProps) {
  const props: Partial<ColorPickerBaseProps<string>> = {
    color: value,
    onChange,
  };

  return supportAlpha ? <HexAlphaColorPicker {...props} /> : <HexColorPicker {...props} />;
}
