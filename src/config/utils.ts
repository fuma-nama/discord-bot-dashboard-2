import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { config } from './common';
import { CustomFeatures } from './custom-types';
import { FeatureConfig, FeatureRender } from './types';

export type IdFeature<K extends keyof CustomFeatures = any> = FeatureConfig<K> & {
  id: K;
};

export function getFeatures(): IdFeature<any>[] {
  return Object.entries(config.guild.features).map(([k, v]) => {
    return {
      id: k,
      ...v,
    };
  });
}

export function useFeatureValue<K extends keyof CustomFeatures, V = Partial<CustomFeatures[K]>>(
  defaultValue: V = {} as V
): {
  value: V;
  setValue: Dispatch<SetStateAction<V>>;
  render: (element: ReactElement) => FeatureRender;
} {
  const [value, setValue] = useState<V>(defaultValue);

  return {
    value,
    setValue,
    render: (element) => ({
      value,
      reset: () => setValue(defaultValue),
      component: element,
    }),
  };
}
