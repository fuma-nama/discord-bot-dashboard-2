import { callReturn, withDiscord } from './core';

export const discord = 'https://discord.com/api/v9';

export type UserInfo = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
};

export type Guild = {
  id: string;
  name: string;
  icon: string;
};

export type IconHash = string;

export async function fetchUserInfo(accessToken: string) {
  return await callReturn<UserInfo>(
    `/users/@me`,
    withDiscord(accessToken, {
      method: 'GET',
    })
  );
}

export async function getGuilds(accessToken: string) {
  return await callReturn<Guild[]>(
    `/users/@me/guilds`,
    withDiscord(accessToken, { method: 'GET' })
  );
}

export async function getGuild(accessToken: string, id: string) {
  return await callReturn<Guild>(`/guild/${id}`, withDiscord(accessToken, { method: 'GET' }));
}

export function bannerToUrl(id: string, hash: IconHash) {
  return `https://cdn.discordapp.com/banners/${id}/${hash}?size=1024`;
}
export function avatarToUrl(id: string, hash: IconHash) {
  return `https://cdn.discordapp.com/avatars/${id}/${hash}?size=512`;
}

export function iconToUrl(id: string, hash: IconHash) {
  return `https://cdn.discordapp.com/icons/${id}/${hash}`;
}

export function iconUrl(guild: Guild) {
  return iconToUrl(guild.id, guild.icon);
}

export function avatarUrl(user: UserInfo) {
  return avatarToUrl(user.id, user.avatar);
}

export function bannerUrl(user: UserInfo) {
  return bannerToUrl(user.id, user.banner);
}
