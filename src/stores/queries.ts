import { CustomGuildInfo } from './../config/custom-types';
import { useAPIStore } from './apiStore';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { UserInfo, getGuild, getGuilds, fetchUserInfo } from 'api/discord';
import { auth, disableFeature, enableFeature, fetchGuildInfo, logout } from 'api/bot';
import { GuildInfo } from 'config/types';

export const client = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 0,
    },
  },
});

export const Keys = {
  login: ['login'],
  guild_info: (guild: string) => ['guild_info', guild],
};
export const Mutations = {
  updateFeature: (guild: string, id: string) => ['feature', guild, id],
};

export function useGuild(id: string) {
  const accessToken = useAPIStore((s) => s.accessToken);

  return useQuery(['guild', id], () => getGuild(accessToken, id), {
    enabled: accessToken != null,
  });
}

export function useGuilds() {
  const accessToken = useAPIStore((s) => s.accessToken);

  return useQuery(['user_guilds'], () => getGuilds(accessToken), {
    enabled: accessToken != null,
  });
}

export function useLogoutMutation() {
  return useMutation(['logout'], () => logout(), {
    onSuccess() {
      client.setQueryData<string>(Keys.login, () => null);
    },
  });
}

/**
 * Get discord oauth2 access token if logged in
 *
 * Then Store the token into api store
 */
export function useLoginQuery() {
  return useQuery(Keys.login, () => auth(), {
    onSuccess(token) {
      useAPIStore.setState({
        accessToken: token,
      });
    },
  });
}

export function useSelfUserQuery() {
  const accessToken = useAPIStore((s) => s.accessToken);

  return useQuery<UserInfo>(['users', 'me'], () => fetchUserInfo(accessToken), {
    enabled: accessToken != null,
    staleTime: Infinity,
  });
}

export function useGuildInfoQuery(guild: string) {
  return useQuery<CustomGuildInfo | null>(Keys.guild_info(guild), () => fetchGuildInfo(guild), {
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 0,
  });
}

export type UpdateFeatureOptions = { enabled: boolean };
export function useUpdateFeatureMutation(guild: string, feature: string) {
  return useMutation(
    Mutations.updateFeature(guild, feature),
    ({ enabled }: UpdateFeatureOptions) =>
      enabled ? enableFeature(guild, feature) : disableFeature(guild, feature),
    {
      onSuccess: (_, { enabled }) => {
        client.setQueryData<GuildInfo>(Keys.guild_info(guild), (prev) => {
          if (prev == null) return null;

          if (enabled) {
            return {
              ...prev,
              enabledFeatures: prev.enabledFeatures.includes(feature)
                ? prev.enabledFeatures
                : [...prev.enabledFeatures, feature],
            };
          } else {
            return {
              ...prev,
              enabledFeatures: prev.enabledFeatures.filter((f) => f !== feature),
            };
          }
        });
      },
    }
  );
}
