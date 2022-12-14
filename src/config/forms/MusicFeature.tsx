import { SimpleGrid } from '@chakra-ui/layout';
import { MusicFeature } from 'config/types';
import { ChannelSelect } from '../example/ChannelSelect';
import { RolesSelect } from '../example/RolesSelect';
import { useFormRender } from 'hooks/forms/useForm';
import { useMemo } from 'react';

export function useMusicFeature(data: MusicFeature) {
  const base = useMemo(() => ({ ...data, count: '2' }), [data]);

  return useFormRender<Partial<MusicFeature>>({
    defaultValue: base,
    verify: (v, errors) => {
      if (v.message != null && v.message.trim().length === 0) {
        errors.message = "Message can't be emtpy or blank";
      }

      if (v.count === '0') errors.count = "Can't be 0";
    },
    container: (f) => (
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
        {f}
      </SimpleGrid>
    ),
    render: ({ value, update, errors, ...form }) => [
      {
        defaultMemorize: ['value', 'error'],
      },
      {
        label: 'Message',
        description: 'Hello World!!!',
        type: 'input',
        value: value.message,
        onChange: (message) => update({ message }),
        error: errors.message,
      },
      {
        type: 'input',
        label: 'Count',
        placeholder: 'Put a number',
        value: value.count ?? '0',
        onChange: (v) => update({ count: v }),
        error: errors.count,
        input: {
          //check instantly after blur
          onBlur: () => form.checkValue('count'),
          type: 'number',
        },
      },
      {
        type: 'small-color',
        label: 'Role Color',
        description: 'Pick a color',
        value: value.color,
        onChange: (color) => update({ color }),
      },
      {
        type: 'color',
        label: 'Role Color',
        description: 'Pick a color',
        value: value.color,
        onChange: (color) => update({ color }),
      },
      {
        type: 'small-date',
        label: 'Date',
        description: 'Select a date',
        value: value.date,
        onChange: (date: Date) => update({ date }),
      },
      {
        type: 'date',
        label: 'Date',
        description: 'Select a date',
        value: value.date,
        onChange: (date: Date) => update({ date }),
      },
      {
        type: 'custom-form',
        label: 'Select a role',
        description: 'Select something',
        component: <RolesSelect value={value.role} onChange={(role) => update({ role })} />,
        memorize: [value.role],
      },
      {
        type: 'custom-form',
        label: 'Channels',
        description: 'Select a Channel',
        component: (
          <ChannelSelect value={value.channel} onChange={(channel) => update({ channel })} />
        ),
        memorize: [value.channel],
      },
      {
        type: 'file',
        label: 'Your File',
        helperText: 'Support Gif, Jpg, Png and Svg files',
        value: value.file,
        onChange: (file) => update({ file }),
        accept: {
          'image/png': ['.png'],
          'image/jpg': ['.jpg'],
          'image/svg': ['.svg'],
          'image/gif': ['.gif'],
        },
        picker: {
          maxFiles: 2,
        },
      },
    ],
  });
}
