import { GuildChannel } from 'api/bot';
import { ChannelTypes } from 'api/discord';
import { FormControlCard } from 'components/forms/FormCard';
import { SelectField, useSelectOptionsMap } from 'components/forms/SelectField';
import { useParams } from 'react-router-dom';
import { useGuildChannelsQuery } from 'stores';
import { Params } from 'views/feature/FeatureView';

type ChannelOption = {
  label: string;
  value: string;
  options?: ChannelOption[];
};

const mapOption = (channel: GuildChannel): ChannelOption =>
  ({
    label: channel.name,
    value: channel.id,
    options: [],
  } as ChannelOption);

export function ChannelSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const { guild } = useParams<Params>();
  const channelsQuery = useGuildChannelsQuery(guild);

  const { options, values } = useSelectOptionsMap<ChannelOption>(
    (map) => {
      if (channelsQuery.data != null) {
        const channels = channelsQuery.data;

        channels
          .filter((c) => c.type === ChannelTypes.GUILD_CATEGORY || c.category == null)
          .forEach((root) => {
            if (root.type === ChannelTypes.GUILD_CATEGORY)
              map.set(root.id, {
                ...mapOption(root),
                options: channels.filter((child) => child.category === root.id).map(mapOption),
              });
            else map.set(root.id, mapOption(root));
          });
      }
    },
    [channelsQuery.data]
  );

  return (
    <FormControlCard label="Channels" description="Select a channel">
      <SelectField
        placeholder="Select a channel"
        options={values as any}
        value={value != null && options.get(value)}
        onChange={(e) => onChange(e.value)}
      />
    </FormControlCard>
  );
}
