import { SimpleGrid } from '@chakra-ui/layout';
import { SmallColorPickerForm } from 'components/forms/ColorPicker';
import { InputForm } from 'components/forms/InputForm';
import { MusicFeature } from 'config/custom-types';
import { UseFeatureValueResult } from 'config/utils';
import { SmallDatePickerForm } from 'components/forms/DatePicker';
import { FilePickerForm } from 'components/forms/FilePicker';
import { ChannelSelect } from './ChannelSelect';
import { Memoize } from 'components/forms/FormComponent';
import { RolesSelect } from './RolesSelect';

export function MusicFeaturePanel({
  result: { value, update },
  data,
}: {
  result: UseFeatureValueResult<Partial<MusicFeature>>;
  data: MusicFeature;
}) {
  const combined = { ...data, ...value };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
      <Memoize
        as={InputForm}
        label="Message"
        description="Hello world!!!"
        value={combined.message}
        onChange={(v) => update({ message: v })}
        placeholder="Your message here..."
        required
      />
      <Memoize
        as={InputForm}
        label="Count"
        placeholder="Put a number"
        value={combined.count ?? '0'}
        onChange={(v) => update({ count: v })}
        input={{
          type: 'number',
        }}
      />
      <Memoize
        as={SmallColorPickerForm}
        label="Role Color"
        value={combined.color}
        onChange={(color) => update({ color })}
      />
      <Memoize as={RolesSelect} value={combined.role} onChange={(role) => update({ role })} />
      <Memoize
        as={ChannelSelect}
        value={combined.channel}
        onChange={(channel) => update({ channel })}
      />
      <Memoize
        as={SmallDatePickerForm}
        label="Date"
        value={combined.date}
        onChange={(value: Date) => update({ date: value })}
      />
      <Memoize
        as={FilePickerForm}
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
    </SimpleGrid>
  );
}

export function toRGB(num: number) {
  num >>>= 0;
  let b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;
  return 'rgb(' + [r, g, b].join(',') + ')';
}
