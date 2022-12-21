import { provider } from './provider';
import { createI18n } from 'hooks/i18n';

const en = {};

const cn: typeof en = {};

export const feature = createI18n(provider, {
  en,
  cn,
});
