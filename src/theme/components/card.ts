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
      },
      _dark: {
        '--custom-card-bg': `colors.${dark.cardBg}`,
      },
      bg: 'var(--custom-card-bg)',
    },
  }),
});
