import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { dark, light } from '../colors';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

const mainStyle = {
  border: '2px solid',
  borderRadius: '16px',
  fontSize: 'sm',
  p: '20px',
  _light: {
    color: 'secondaryGray.900',
    bg: 'transparent',
    _placeholder: {
      color: 'secondaryGray.700',
    },
    borderColor: 'secondaryGray.400',
  },
  _dark: {
    color: 'white',
    bg: 'navy.800',
    _placeholder: {
      color: 'secondaryGray.600',
    },
    borderColor: 'navy.600',
  },
};

export const inputStyles = defineMultiStyleConfig({
  baseStyle: definePartsStyle((props) => ({
    field: {
      fontWeight: 400,
      borderColor: mode('secondaryGray.400', 'navy.600')(props),
      borderRadius: '8px',
    },
  })),

  variants: {
    flushed: definePartsStyle(() => ({
      field: {
        _focus: {
          _dark: {
            borderColor: dark.brand,
          },
          _light: {
            borderColor: light.brand,
          },
          boxShadow: 'none',
        },

        fontSize: '2xl',
        fontWeight: '600',
        _light: {
          color: light.textColorPrimary,
          borderBottomColor: 'secondaryGray.400',
        },
        _dark: {
          color: dark.textColorPrimary,
          borderBottomColor: 'navy.600',
        },
      },
    })),
    main: definePartsStyle({
      field: mainStyle,
    }),
    focus: definePartsStyle({
      field: {
        ...mainStyle,
        _focus: {
          _light: {
            borderColor: 'brand.300',
          },
          _dark: {
            borderColor: 'brand.400',
          },
        },
      },
    }),
    auth: definePartsStyle({
      field: {
        bg: 'transparent',
        fontWeight: '500',
        _light: {
          color: 'navy.700',
          borderColor: 'secondaryGray.100',
        },
        _dark: {
          color: 'white',
          borderColor: 'rgba(135, 140, 189, 0.3)',
        },
        border: '1px solid',
        borderRadius: '16px',
        _placeholder: { color: 'secondaryGray.600', fontWeight: '400' },
      },
    }),
    authSecondary: definePartsStyle({
      field: {
        bg: 'transparent',
        border: '1px solid',
        borderColor: 'secondaryGray.100',
        borderRadius: '16px',
        _placeholder: { color: 'secondaryGray.600' },
      },
    }),
    search: definePartsStyle({
      field: {
        border: 'none',
        py: '11px',
        borderRadius: 'inherit',
        _placeholder: { color: 'secondaryGray.600' },
      },
    }),
  },
});
