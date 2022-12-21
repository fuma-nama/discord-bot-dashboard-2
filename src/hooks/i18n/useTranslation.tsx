import { TranslationKey, Translation, I18nConfig } from './translations';

export type I18nProvider<Languages extends string> = {
  getLang: () => Languages;
  useLang: () => Languages;
};

type I18nProviderLang<Provider> = Provider extends I18nProvider<infer Languages>
  ? Languages
  : never;

export type LanguagesProvider<Languages extends string> = {
  names: {
    [K in Languages]: string;
  };
  languages: {
    key: Languages;
    name: string;
  }[];
};

export function initLanguages<Langs extends string>(languages: {
  [K in Langs]: string;
}): LanguagesProvider<Langs> {
  return {
    languages: Object.entries<string>(languages).map(([key, name]) => ({
      key: key as Langs,
      name: name as string,
    })),
    names: languages,
  };
}

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

export function createI18n<Keys extends TranslationKey>(
  provider: I18nProvider<any>,
  translations: {
    [lang in I18nProviderLang<typeof provider>]: Translation<Keys>;
  }
): I18nConfig<I18nProviderLang<typeof provider>, Keys> {
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
