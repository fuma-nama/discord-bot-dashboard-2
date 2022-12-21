import { ReactElement } from 'react';
import { Translation, TranslationModel } from './translations';

type I18nProviderLang<Provider> = Provider extends I18nProvider<infer Languages>
  ? Languages
  : never;

export type I18nConfig<Languages extends string, Model extends TranslationModel> = {
  useTranslations: () => Translation<Model>;
  translate: (key: keyof Model) => string;
  translations: {
    [lang in Languages]: Translation<Model>;
  };
  T: (props: { text: keyof Model }) => ReactElement;
};

export type I18nProvider<Languages extends string> = {
  getLang: () => Languages;
  useLang: () => Languages;
};

export type TranslationofConfig<T> = T extends I18nConfig<never, infer Keys>
  ? Translation<Keys>
  : never;

/**
 * A type-safe light-weight implmentation of i18n
 */
export function initI18n<Languages extends string>(config: {
  /**
   * get current langauge
   */
  getLang: () => Languages;
  /**
   * get and subscribe current langauge
   */
  useLang: () => Languages;
}): I18nProvider<Languages> {
  return {
    getLang: config.getLang,
    useLang: config.useLang,
  };
}

export function createI18n<Model extends TranslationModel>(
  provider: I18nProvider<any>,
  translations: {
    [lang in I18nProviderLang<typeof provider>]: Translation<Model>;
  }
): I18nConfig<I18nProviderLang<typeof provider>, Model> {
  return {
    translations: translations,
    translate(key) {
      const lang = provider.getLang();

      return translations[lang][key];
    },
    useTranslations() {
      const lang = provider.useLang();
      const translation = translations[lang];

      return translation;
    },
    T({ text }) {
      const lang = provider.useLang();
      const translation = translations[lang];

      return <>{translation[text]}</>;
    },
  };
}
