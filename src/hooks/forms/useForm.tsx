import { FeatureRender } from 'config/types';
import { Dispatch, SetStateAction, ReactElement, useState } from 'react';
import { converter } from './useFormValue';

export type FormErrors<V> = {
  [K in keyof V]?: string;
};

export type UseFormOptions<V> = {
  defaultValue: V;

  /**
   * Convert value to json/form body used for http request
   */
  converter?: 'json' | 'form' | ((v: V) => FormData | string);

  /**
   * Verify input value before submit
   */
  verify?: (v: V, errors: FormErrors<V>) => void;
};

export type UseFormResult<V> = {
  value: V;
  update: Dispatch<Partial<V>>;
  setValue: Dispatch<SetStateAction<V>>;

  /**
   * Check if value contains errors and update errors state
   *
   * @param keys If not empty, Only update errors of specified keys
   * @return true if invalid
   */
  checkValue: (...keys: (keyof V)[]) => boolean;
  errors: FormErrors<V>;
  setErrors: Dispatch<(prev: FormErrors<V>) => FormErrors<V>>;

  render: (element: ReactElement) => FeatureRender;
};

type FormState<V> = {
  updated: boolean;
  errors: {
    [K in keyof V]?: string;
  };
};

export function useForm<V>(options: UseFormOptions<V>): UseFormResult<V> {
  const [value, setValue] = useState<V>(options.defaultValue);
  const [state, setState] = useState<FormState<V>>({
    updated: false,
    errors: {},
  });
  const convert = converter(options.converter ?? 'json');

  const checkValue = (...keys: (keyof V)[]) => {
    let errors: FormErrors<V> = {};
    options.verify?.(value, errors);
    errors = filterKeys<FormErrors<V>>(errors, keys);

    const hasError = Object.keys(errors).length > 0;

    setState((prev) => ({ ...prev, errors }));
    return hasError;
  };

  return {
    value,
    errors: state.errors,
    checkValue,
    setErrors: (dispatch) => setState((prev) => ({ ...prev, errors: dispatch(prev.errors) })),
    update: (action) => setValue((prev) => ({ ...prev, ...action })),
    setValue,
    render: (element) => {
      return {
        canSave: Object.entries(value).length !== 0,
        onSubmit: () => checkValue(),
        serialize: () => convert(value),
        reset: () => setValue(options.defaultValue),
        component: element,
      };
    },
  };
}

function filterKeys<V>(obj: V, keys: (keyof V)[]): Partial<V> {
  const temp: Partial<V> = {};

  for (const key of keys) {
    temp[key] = obj[key];
  }

  return temp;
}
