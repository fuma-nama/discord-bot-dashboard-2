import { CustomFeatures } from './custom-types';
import { Guild } from 'api/discord';
import { ReactElement, ReactNode } from 'react';

export type AppConfig = {
  /**
   * bot name
   */
  name: string;
  /**
   * icon (react component)
   */
  icon?: (props: any) => ReactElement;
  /**
   * Guild settings
   */
  guild: GuildConfig;
  /**
   * Url to invite the bot
   *
   * example: `https://discord.com/api/oauth2/authorize?client_id=907955781972918281&permissions=8&scope=bot`
   */
  inviteUrl: string;

  pages?: {
    /**
     * The Dashboard page
     */
    useDashboard?: () => ReactElement;

    /**
     * The Profile page
     */
    useProfile?: () => ReactElement;
  };
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
  features: {
    [K in keyof CustomFeatures]: Feature<K>;
  };
};

export interface GuildInfo {
  enabledFeatures: string[];
}

/**
 * Internal Feature info
 */
export interface Feature<K extends keyof CustomFeatures> {
  name: string;
  description?: string;
  icon?: ReactElement;
  /**
   * Render content in Feature view
   */
  useRender: (data: CustomFeatures[K]) => ReactElement;
  /**
   * Render skeleton before featrue is loaded
   */
  useSkeleton?: () => ReactNode;
}
