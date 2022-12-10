import { SimpleGrid } from '@chakra-ui/layout';
import { Icon, Image } from '@chakra-ui/react';
import { SmallColorPickerForm } from 'components/forms/ColorPicker';
import { FormControlCard } from 'components/forms/FormCard';
import { InputForm } from 'components/forms/InputForm';
import { MusicFeature } from 'config/custom-types';
import { UseFeatureValueResult } from 'config/utils';
import { useParams } from 'react-router-dom';
import { useGuildRolesQuery } from 'stores';
import { Params } from 'views/feature/FeatureView';
import { SelectField, useSelectOptions } from 'components/forms/SelectField';
import { BsPeopleFill } from 'react-icons/bs';
import { SmallDatePickerForm } from 'components/forms/DatePicker';
import { FilePickerForm } from 'components/forms/FilePicker';
import { ChannelSelect } from './ChannelSelect';

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
      <InputForm
        label="Message"
        description="Hello world!!!"
        value={combined.message}
        onChange={(v) => update({ message: v })}
        placeholder="Your message here..."
        required
      />
      <InputForm
        label="Count"
        placeholder="Put a number"
        value={combined.count ?? '0'}
        onChange={(v) => update({ count: v })}
        input={{
          type: 'number',
        }}
      />
      <SmallColorPickerForm
        label="Role Color"
        value={combined.color}
        onChange={(v) => update({ color: v })}
      />
      <RolesSelect value={combined.role} onChange={(role) => update({ role })} />
      <ChannelSelect value={combined.channel} onChange={(channel) => update({ channel })} />
      <SmallDatePickerForm
        label="Date"
        value={combined.date}
        onChange={(value: Date) => update({ date: value })}
      />
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
    </SimpleGrid>
  );
}

function RolesSelect({ value, onChange }: { value?: string; onChange: (role: string) => void }) {
  const { guild } = useParams<Params>();
  const rolesQuery = useGuildRolesQuery(guild);
  const { options, values } = useSelectOptions(rolesQuery.data, (role) => ({
    value: role.id,
    label: role.name,
    icon:
      role.icon?.iconUrl != null ? (
        <Image src={role.icon?.iconUrl} bg={toRGB(role.color)} w="25px" h="25px" />
      ) : (
        <Icon as={BsPeopleFill} color={toRGB(role.color)} w="20px" h="20px" />
      ),
  }));

  return (
    <FormControlCard label="Roles" description="Select a role">
      <SelectField
        placeholder="Select a role"
        value={value != null && options.get(value)}
        onChange={(e) => onChange(e.value)}
        options={values}
      />
    </FormControlCard>
  );
}

function toRGB(num: number) {
  num >>>= 0;
  let b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;
  return 'rgb(' + [r, g, b].join(',') + ')';
}
