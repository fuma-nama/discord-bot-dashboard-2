import { Box, HStack } from '@chakra-ui/layout';
import {
  chakraComponents,
  ChakraStylesConfig,
  OptionBase,
  Select,
  SelectComponent,
} from 'chakra-react-select';
import { DependencyList, ReactNode, useMemo } from 'react';
import { dark, light, useColors } from 'theme';

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

const styles: ChakraStylesConfig<any, any, any> = {
  placeholder: (provided) => ({
    ...provided,
    _light: {
      color: 'secondaryGray.700',
    },
    _dark: {
      color: 'secondaryGray.600',
    },
  }),
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
      bg: options.isSelected && light.brand,
      _hover: {
        bg: options.isSelected ? light.brand : 'white',
      },
    },
    _dark: {
      bg: options.isSelected && dark.brand,
      _hover: {
        bg: options.isSelected ? dark.brand : 'whiteAlpha.200',
      },
    },
  }),
  control: (provided, data) => ({
    ...provided,
    rounded: '2xl',
    _light: {
      borderColor: data.isFocused ? light.brand : 'secondaryGray.400',
    },
    _dark: {
      borderColor: data.isFocused ? dark.brand : 'navy.600',
    },
  }),
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
      chakraStyles={styles}
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
