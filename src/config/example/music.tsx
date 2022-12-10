import { SimpleGrid } from '@chakra-ui/layout';
import { InputForm } from 'components/forms/InputForm';
import { MusicFeature } from 'config/custom-types';
import { UseFeatureValueResult } from 'config/utils';

export function MusicFeaturePanel({
  result: { value, update },
  data,
}: {
  result: UseFeatureValueResult<Partial<MusicFeature>>;
  data: MusicFeature;
}) {
  const combined = { ...data, ...value };

  return (
    <SimpleGrid columns={2}>
      <InputForm
        label="Message"
        value={combined.message}
        onChange={(v) => update({ message: v })}
        placeholder="Your message here..."
        required
      />
    </SimpleGrid>
  );
}
