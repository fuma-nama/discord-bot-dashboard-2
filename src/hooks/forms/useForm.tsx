import { ComponentProps, DependencyList, Fragment, ReactElement } from 'react';
import { ColorPickerForm, SmallColorPickerForm } from 'components/forms/ColorPicker';
import { DatePickerForm, SmallDatePickerForm } from 'components/forms/DatePicker';
import { FilePickerForm } from 'components/forms/FilePicker';
import { FormComponentProps, FormControlCard } from 'components/forms/Form';
import { Memoize } from 'components/forms/FormComponent';
import { InputForm } from 'components/forms/InputForm';

export type FormInput = (
  | Input
  | DatePicker
  | SmallDatePicker
  | ColorPicker
  | SmallColorPicker
  | FilePicker
  | Custom
  | CustomForm
) &
  IForm;

interface IForm {
  /**
   * prevent re-renders until objects in memorize list is changed
   *
   * This settings may imporve performance
   *
   * default: not enabled
   */
  memorize?: DependencyList;
}

export type Input = ComponentProps<typeof InputForm> & { type: 'input' };

export type DatePicker = ComponentProps<typeof DatePickerForm> & { type: 'date' };
export type SmallDatePicker = ComponentProps<typeof SmallDatePickerForm> & { type: 'small-date' };

export type ColorPicker = ComponentProps<typeof ColorPickerForm> & { type: 'color' };
export type SmallColorPicker = ComponentProps<typeof SmallColorPickerForm> & {
  type: 'small-color';
};

export type FilePicker = ComponentProps<typeof FilePickerForm> & { type: 'file' };

export type Custom = { type: 'custom'; component: ReactElement };
export type CustomForm = FormComponentProps<{ type: 'custom-form'; component: ReactElement }>;

export type FormOptions = {
  /**
   * memorize specified keys in all inputs
   */
  defaultMemorize?: string[];
};

export function useForm(options: FormOptions = {}, ...inputs: FormInput[]) {
  return form(options, ...inputs);
}

export function form(options: FormOptions = {}, ...inputs: FormInput[]) {
  function getForm(input: FormInput) {
    const { type, memorize, ...props } = input;

    switch (type) {
      case 'input':
        return <InputForm {...(props as any)} />;
      case 'date':
        return <DatePickerForm {...(props as any)} />;
      case 'small-date':
        return <SmallDatePickerForm {...(props as any)} />;
      case 'custom-form': {
        const { component, ...form } = props as any as CustomForm;

        return <FormControlCard {...form}>{component}</FormControlCard>;
      }
      case 'custom':
        return input.component;
      case 'color':
        return <ColorPickerForm {...(props as any)} />;
      case 'small-color':
        return <SmallColorPickerForm {...(props as any)} />;
      case 'file':
        return <FilePickerForm {...(props as any)} />;
    }
  }

  return (
    <>
      {inputs.map((input, i) => {
        const form = getForm(input);

        if (input.memorize !== undefined || options.defaultMemorize !== undefined) {
          const memorize =
            input.memorize ??
            options.defaultMemorize?.map((key) => input[key as keyof typeof input]);

          return (
            <Memoize key={i} dependencies={memorize}>
              {form}
            </Memoize>
          );
        }

        return <Fragment key={i}>{form}</Fragment>;
      })}
    </>
  );
}
