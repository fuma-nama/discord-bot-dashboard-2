import { SimpleGrid } from '@chakra-ui/layout';
import { MusicFeature } from 'config/custom-types';
import { ChannelSelect } from '../example/ChannelSelect';
import { RolesSelect } from '../example/RolesSelect';
import { createForm } from 'hooks/forms/createForm';
import { useForm } from 'hooks/forms/useForm';

export function useMusicFeature(data: MusicFeature) {
  const { value, update, errors, ...form } = useForm<Partial<MusicFeature>>({
    defaultValue: {},
    verify: (v, errors) => {
      if (v.message != null && v.message.trim().length === 0) {
        errors.message = "Message can't be emtpy or blank";
      }

      if (v.count === '0') errors.count = "Can't be 0";
    },
  });

  const combined = { ...data, ...value };
  const component = createForm(
    {
      defaultMemorize: ['value', 'error'],
    },
    {
      label: 'Message',
      description: 'Hello World!!!',
      type: 'input',
      value: combined.message,
      onChange: (message) => update({ message }),
      error: errors.message,
    },
    {
      type: 'input',
      label: 'Count',
      placeholder: 'Put a number',
      value: combined.count ?? '0',
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
    },
    {
      type: 'file',
      label: 'Your File',
      helperText: 'Support Gif, Jpg, Png and Svg files',
      value: combined.file,
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
    }
  );

  return form.render(
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
      {component}
    </SimpleGrid>
  );
}
