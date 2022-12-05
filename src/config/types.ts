import { Guild } from 'api/discord';
import { ReactElement } from 'react';

export type AppConfig = {
  /**
   * bot name
   */
  name: string;
  /**
   * icon (react component)
   */
  icon?: (props: any) => ReactElement;
  guild: GuildConfig;
};

export type GuildConfig = {
  /**
   * Filter configurable guilds
   *
   * ex: to allow only if user permissions include ADMINISTRATOR
   * ```
   * import { PermissionFlags } from 'api/discord';
   * (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0
   * ```
   */
  filter: (guild: Guild) => boolean;
};
