import { createI18n, initI18n, initLanguages } from 'hooks/i18n';
import { useSettingsStore } from 'stores';

/**
 * Supported languages
 */
export type Languages = 'en' | 'cn';
export const { languages, names } = initLanguages<Languages>({
  en: 'English',
  cn: 'Chinese',
});

const provider = initI18n({
  getLang: () => useSettingsStore.getState().lang,
  useLang: () => useSettingsStore((s) => s.lang),
});

const en = {
  common: {},
  home: {
    music: 'Music',
  },
};

const cn: typeof en = {
  common: {},
  home: {
    music: '音樂',
  },
};

export const common = createI18n<keyof typeof en['common']>(provider, {
  cn: cn.common,
  en: en.common,
});

export const home = createI18n<keyof typeof en['home']>(provider, {
  cn: cn.home,
  en: en.home,
});
