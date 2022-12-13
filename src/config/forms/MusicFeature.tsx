import { SimpleGrid } from '@chakra-ui/layout';
import { SmallColorPickerForm } from 'components/forms/ColorPicker';
import { InputForm } from 'components/forms/InputForm';
import { MusicFeature } from 'config/custom-types';
import { SmallDatePickerForm } from 'components/forms/DatePicker';
import { FilePickerForm } from 'components/forms/FilePicker';
import { ChannelSelect } from '../example/ChannelSelect';
import { Memoize } from 'components/forms/FormComponent';
import { RolesSelect } from '../example/RolesSelect';
import { form, useForm } from 'hooks/forms/useForm';
import { UseFeatureValueResult } from 'hooks/forms';

export function useMusicFeature({
  result: { value, update },
  data,
}: {
  result: UseFeatureValueResult<Partial<MusicFeature>>;
  data: MusicFeature;
}) {
  const combined = { ...value, ...data };

  return useForm(
    {
      defaultMemorize: ['value'],
    },
    {
      label: 'Message',
      description: 'Hello World!!!',
      type: 'input',
      value: combined.message,
      onChange: (message) => update({ message }),
    },
    {
      type: 'input',
      label: 'Count',
      placeholder: 'Put a number',
      value: combined.count ?? '0',
      onChange: (v) => update({ count: v }),
      input: {
        type: 'number',
      },
    },
    {
      type: 'color',
      label: 'Role Color',
      value: combined.color,
      onChange: (color) => update({ color }),
    },
    {
      type: 'custom-form',
      label: 'Select a role',
      description: 'Select something',
      component: <RolesSelect value={combined.role} onChange={(role) => update({ role })} />,
      memorize: [combined.role],
    }
  );
}
export function MusicFeaturePanel({
  result: { value, update },
  data,
}: {
  result: UseFeatureValueResult<Partial<MusicFeature>>;
  data: MusicFeature;
}) {
  const combined = { ...data, ...value };
  const component = form(
    {
      defaultMemorize: ['value'],
    },
    {
      label: 'Message',
      description: 'Hello World!!!',
      type: 'input',
      value: combined.message,
      onChange: (message) => update({ message }),
    },
    {
      type: 'input',
      label: 'Count',
      placeholder: 'Put a number',
      value: combined.count ?? '0',
      onChange: (v) => update({ count: v }),
      input: {
        type: 'number',
      },
    },
    {
      type: 'small-color',
      label: 'Role Color',
      description: 'Pick a color',
      value: combined.color,
      onChange: (color) => update({ color }),
    },
    {
      type: 'color',
      label: 'Role Color',
      description: 'Pick a color',
      value: combined.color,
      onChange: (color) => update({ color }),
    },
    {
      type: 'small-date',
      label: 'Date',
      description: 'Select a date',
      value: combined.date,
      onChange: (date: Date) => update({ date }),
    },
    {
      type: 'date',
      label: 'Date',
      description: 'Select a date',
      value: combined.date,
      onChange: (date: Date) => update({ date }),
    },
    {
      type: 'custom-form',
      label: 'Select a role',
      description: 'Select something',
      component: <RolesSelect value={combined.role} onChange={(role) => update({ role })} />,
      memorize: [combined.role],
    },
    {
      type: 'custom-form',
      label: 'Channels',
      description: 'Select a Channel',
      component: (
        <ChannelSelect value={combined.channel} onChange={(channel) => update({ channel })} />
      ),
      memorize: [combined.channel],
    }
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
      {component}
      <Memoize dependencies={[combined.file]}>
        <FilePickerForm
          value={combined.file}
          onChange={(v) => update({ file: v })}
          label="Your File"
          helperText="Support Gif, Jpg, Png and Svg files"
          accept={{
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/svg': ['.svg'],
            'image/gif': ['.gif'],
          }}
          picker={{
            maxFiles: 2,
          }}
        />
      </Memoize>
    </SimpleGrid>
  );
}
