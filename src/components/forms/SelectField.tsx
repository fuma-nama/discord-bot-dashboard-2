import { Box, HStack } from '@chakra-ui/layout';
import { chakraComponents, Select, SelectComponent } from 'chakra-react-select';
import { useColors } from 'theme';

const customComponents = {
  SingleValue: ({ children, ...props }: any) => {
    return (
      <chakraComponents.SingleValue {...props}>
        <HStack>
          {props.data.icon}
          <span>{children}</span>
        </HStack>
      </chakraComponents.SingleValue>
    );
  },
  Option: ({ children, ...props }: any) => {
    return (
      <chakraComponents.Option {...props}>
        <Box mr={2}>{props.data.icon}</Box> {children}
      </chakraComponents.Option>
    );
  },
};

export const SelectField: SelectComponent = (props) => {
  const { brand } = useColors();

  return (
    <Select
      focusBorderColor={brand}
      components={customComponents}
      chakraStyles={{
        dropdownIndicator: (provided) => ({
          ...provided,
          bg: 'transparent',
        }),
        groupHeading: (provided) => ({
          ...provided,
          _light: {
            bg: 'secondaryGray.100',
          },
          _dark: {
            bg: 'navy.800',
          },
        }),
        option: (provided, options) => ({
          ...provided,
          color: options.isSelected && 'white',
          _light: {
            bg: options.isSelected && 'brand.300',
            _hover: {
              bg: options.isSelected ? 'brand.300' : 'white',
            },
          },
          _dark: {
            bg: options.isSelected && 'brand.400',
            _hover: {
              bg: options.isSelected ? 'brand.400' : 'whiteAlpha.200',
            },
          },
        }),
        control: (provided, data) => ({
          ...provided,
          rounded: '2xl',
          _light: {
            borderColor: data.isFocused ? brand : 'secondaryGray.400',
          },
          _dark: {
            borderColor: data.isFocused ? brand : 'navy.600',
          },
        }),
      }}
      {...props}
    />
  );
};
