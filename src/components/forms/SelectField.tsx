import { Box, HStack } from '@chakra-ui/layout';
import { chakraComponents, OptionBase, Select, SelectComponent } from 'chakra-react-select';
import { DependencyList, ReactNode, useMemo } from 'react';
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

export type Option = OptionBase & {
  label: string;
  value: string;
  icon?: ReactNode;
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

export function useSelectOptions<R, T extends Option>(data: R[] | null, mapper: (v: R) => T) {
  return useMemo(() => {
    const options = new Map<string, Option>();

    data?.forEach((item) => {
      const mapped = mapper(item);

      options.set(mapped.value, mapped);
    });

    return {
      options,
      values: [...options.values()],
    };
  }, [data]);
}

export function useSelectOptionsMap<T extends Option>(
  mapper: (map: Map<string, T>) => void,
  dependencies: DependencyList
) {
  return useMemo(() => {
    const options = new Map<string, T>();
    mapper(options);

    return {
      options,
      values: [...options.values()],
    };
  }, [dependencies]);
}
