import { CustomFeatures } from 'config/custom-types';
import { FeatureRender } from 'config/types';
import { Dispatch, SetStateAction, ReactElement, useState } from 'react';

export type UseFeatureValueOptions<V> = {
  defaultValue?: V;
  /**
   * Convert value to json/form body used for http request
   */
  converter?: 'json' | 'form' | ((v: V) => FormData | string);
  /**
   * Verify input value
   *
   * Return true if value is valid
   */
  valid?: (v: V) => boolean;
};

export type FormProps<T> = {
  value: T;
  onChange: (v: T) => void;
};

export type UseFeatureValueResult<V> = {
  value: V;
  update: Dispatch<Partial<V>>;
  setValue: Dispatch<SetStateAction<V>>;
  render: (element: ReactElement) => FeatureRender;
};

export function useFeatureValue<K extends keyof CustomFeatures, V = Partial<CustomFeatures[K]>>(
  options?: UseFeatureValueOptions<V>
): UseFeatureValueResult<V> {
  const defaultValue = options?.defaultValue ?? ({} as V);
  const [value, setValue] = useState<V>(defaultValue);
  const convert = converter(options?.converter ?? 'json');

  return {
    value,
    update: (action) => setValue((prev) => ({ ...prev, ...action })),
    setValue,
    render: (element) => {
      const valid = options?.valid == null ? true : options.valid(value);

      return {
        canSave: Object.entries(value).length !== 0 && valid,
        serialize: () => convert(value),
        reset: () => setValue(defaultValue),
        component: element,
      };
    },
  };
}
export function converter<V>(
  base: 'json' | 'form' | ((v: V) => FormData | string)
): (v: V) => FormData | string {
  switch (base) {
    case 'json':
      return (v) => JSON.stringify(v);
    case 'form':
      return (v) => {
        const data = new FormData();
        for (const [key, value] of Object.entries(v)) {
          data.set(key, value);
        }

        return data;
      };
    default:
      return (v) => base(v);
  }
}
