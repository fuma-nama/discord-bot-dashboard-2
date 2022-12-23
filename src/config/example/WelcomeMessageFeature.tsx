import { InputForm } from 'components/forms/InputForm';
import { TextAreaForm } from 'components/forms/TextAreaForm';
import { WelcomeMessageFeature } from 'config/types';
import { useForm } from 'hooks/forms/useForm';

export function useWelcomeMessageFeature(data: WelcomeMessageFeature) {
  const { render, value, update, errors } = useForm<Partial<WelcomeMessageFeature>>({
    defaultValue: data,
    emptyValue: {},
  });

  return render(
    <TextAreaForm
      label="Message"
      description="The message to send"
      placeholder="Type something here..."
      value={value.message}
      onChange={(message) => update({ message })}
      error={errors.message ?? 'Bad'}
    />
  );
}
