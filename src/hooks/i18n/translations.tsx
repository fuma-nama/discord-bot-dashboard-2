/**
 * A type-safe light-weight implmentation of i18n
 */

import { ReactElement } from 'react';

export type TranslationKey = string | number | symbol;

export type Translation<Keys extends TranslationKey> = {
  [k in Keys]: string;
};

export type Translations<Languages extends string, Keys extends TranslationKey> = {
  [lang in Languages]: Translation<Keys>;
};

export type I18nConfig<Languages extends string, Keys extends TranslationKey> = {
  useTranslations: () => Translation<Keys>;
  translate: (key: Keys) => string;
  translations: Translations<Languages, Keys>;
  T: (props: { text: Keys }) => ReactElement;
};
