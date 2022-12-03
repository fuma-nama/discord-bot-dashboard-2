import { useColorModeValue } from '@chakra-ui/react';

export const light = {
  globalBg: 'secondaryGray.300',
  brand: 'brand.500',
  textColorPrimary: 'secondaryGray.900',
  textColorSecondary: 'gray.400',
  textColorDetails: 'navy.700',
  borderColor: 'white !important',
  cardBg: 'white',
  menuBg: 'white',
  shadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
};

export const dark = {
  globalBg: 'navy.900',
  brand: 'brand.400',
  textColorPrimary: 'white',
  textColorSecondary: 'gray.400',
  textColorDetails: 'secondaryGray.600',
  borderColor: '#111C44 !important',
  cardBg: 'navy.800',
  menuBg: 'navy.800',
  shadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
};

export function useColors() {
  return useColorModeValue(light, dark);
}

export function useColorsExtend<T>(_light: T, _dark: T) {
  return useColorModeValue({ ...light, ..._light }, { ...dark, ..._dark });
}

export function useNavbarColors() {
  return useColorsExtend(
    {
      textColorBrand: 'brand.700',
      iconColor: 'gray.400',
    },
    {
      textColorBrand: 'brand.400',
      iconColor: 'white',
    }
  );
}

export function useAuthColors() {
  return useColorsExtend(
    {
      textColorBrand: 'brand.500',
      brandStars: 'brand.500',
      googleBg: 'secondaryGray.300',
      googleText: 'navy.700',
      buttonHover: { bg: 'gray.200' },
      buttonActive: { bg: 'secondaryGray.300' },
    },
    {
      textColorBrand: 'white',
      brandStars: 'brand.400',
      googleBg: 'whiteAlpha.200',
      googleText: 'white',
      buttonHover: { bg: 'whiteAlpha.300' },
      buttonActive: { bg: 'whiteAlpha.200' },
    }
  );
}

export function useItemHoverBg() {
  return useColorModeValue(
    { bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)' },
    { bg: 'navy.700', boxShadow: 'unset' }
  );
}
