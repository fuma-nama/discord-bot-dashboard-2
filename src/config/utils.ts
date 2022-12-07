import { config } from './common';
import { CustomFeatures } from './custom-types';
import { Feature } from './types';

export type IdFeature<K extends keyof CustomFeatures = any> = Feature<K> & {
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
