export type TranslationKey = string | number | symbol;

export type TranslationModel = {
  [key: TranslationKey]: any;
};

export type Translation<Model extends TranslationModel> = {
  [K in keyof Model]: Model[K];
};
