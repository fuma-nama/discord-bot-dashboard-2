import { SimpleGrid } from '@chakra-ui/layout';
import { ColorPickerForm } from 'components/forms/ColorPicker';
import { InputForm } from 'components/forms/InputForm';
import { MusicFeature } from 'config/custom-types';
import { UseFeatureValueResult } from 'config/utils';
import { useState } from 'react';

export function MusicFeaturePanel({
  result: { value, update },
  data,
}: {
  result: UseFeatureValueResult<Partial<MusicFeature>>;
  data: MusicFeature;
}) {
  const [count, setCount] = useState('0');
  const [color, setColor] = useState<string>();

  const combined = { ...data, ...value };

  return (
    <SimpleGrid columns={2} gap={3}>
      <InputForm
        label="Message"
        value={combined.message}
        onChange={(v) => update({ message: v })}
        placeholder="Your message here..."
        required
      />
      <InputForm
        label="Count"
        placeholder="Put a number"
        input={{
          value: count,
          onChange: (e) => setCount(e.target.value),
          type: 'number',
        }}
      />
      <ColorPickerForm label="Role Color" value={color} onChange={(v) => setColor(v)} />
    </SimpleGrid>
  );
}
