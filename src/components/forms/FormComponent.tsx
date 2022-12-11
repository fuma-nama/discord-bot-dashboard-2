import { As, MergeWithAs } from '@chakra-ui/react';
import { ComponentProps } from 'react';
import { DependencyList, FC, memo, PropsWithRef, ReactElement } from 'react';

export function formComponent<T extends { value: any }>(
  component: (props: T) => ReactElement,
  dependencies: (props: T) => DependencyList = (p) => [p.value]
) {
  return memo<T>(component, (prev, next) => {
    const prevDeps = dependencies(prev);
    const nextDeps = dependencies(next);

    return prevDeps.every((v, i) => v === nextDeps[i]);
  });
}

export function memorized<T>(
  component: (props: T) => ReactElement,
  dependencies: (props: T) => DependencyList
) {
  return memo(component, (prev, next) => {
    const prevDeps = dependencies(prev);
    const nextDeps = dependencies(next);

    return prevDeps.every((v, i) => v === nextDeps[i]);
  });
}

export const Memoize: <Component extends As>(
  props: PropsWithRef<
    React.ComponentProps<Component> & {
      as: Component;
    }
  >
) => ReactElement = memorized(
  ({ as, ...props }) => {
    return as(props as any);
  },
  (p) => [p.value]
);
