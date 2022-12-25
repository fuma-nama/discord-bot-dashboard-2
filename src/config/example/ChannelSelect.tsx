import { ChatIcon, Icon } from '@chakra-ui/icons';
import { GuildChannel } from 'api/bot';
import { ChannelTypes } from 'api/discord';
import { Option, SelectField } from 'components/forms/SelectField';
import { MdRecordVoiceOver } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useGuildChannelsQuery } from 'stores';
import { Params } from 'views/feature/FeatureView';

type ChannelOption = Option & {
  label: string;
  value: string;
  options?: ChannelOption[];
};

const mapOption = (channel: GuildChannel): ChannelOption => {
  let icon;
  switch (channel.type) {
    case ChannelTypes.GUILD_STAGE_VOICE:
    case ChannelTypes.GUILD_VOICE: {
      icon = <Icon as={MdRecordVoiceOver} />;
      break;
    }
    default: {
      icon = <ChatIcon />;
      break;
    }
  }

  return {
    label: channel.name,
    value: channel.id,
    icon,
  };
};

export function ChannelSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { guild } = useParams<Params>();
  const channelsQuery = useGuildChannelsQuery(guild);
  const isLoading = channelsQuery.isLoading;

  const selected = value != null && channelsQuery.data?.find((c) => c.id === value);
  const render = (channel: GuildChannel) => {
    if (channel.type === ChannelTypes.GUILD_CATEGORY) {
      const options = channelsQuery.data
        .filter((children) => children.category === channel.id)
        .map(mapOption);

      return {
        ...mapOption(channel),
        options: options,
      };
    }

    return mapOption(channel);
  };

  return (
    <SelectField
      isDisabled={isLoading}
      isLoading={isLoading}
      placeholder="Select a channel"
      value={selected != null && mapOption(selected)}
      options={channelsQuery.data?.filter((channel) => channel.category == null).map(render)}
      onChange={(e) => onChange(e.value)}
    />
  );
}
