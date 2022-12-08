import { dark } from './../colors';
import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { light } from 'theme/colors';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys
);

export const cardStyles = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    container: {
      _light: {
        '--custom-card-bg': `colors.${light.cardBg}`,
        '--card-color': `colors.${light.textColorPrimary}`,
      },
      _dark: {
        '--custom-card-bg': `colors.${dark.cardBg}`,
        '--card-color': `colors.${dark.textColorPrimary}`,
      },
      color: 'var(--card-color)',
      bg: 'var(--custom-card-bg)',
      p: 'var(--card-padding)',
    },
    header: {
      fontSize: 'xl',
      fontWeight: '600',
      p: 0,
    },
    body: {
      p: 0,
    },
    footer: {
      p: 0,
      mt: 4,
    },
  }),
});
