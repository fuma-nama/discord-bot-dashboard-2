import { CustomFeatures, CustomGuildInfo } from 'config/custom-types';
import { withBot, callDefault, callReturn } from './core';

export const bot = 'http://localhost:8080';

/**
 * Get discord oauth2 access token if logged in, otherwise return null
 */
export async function auth() {
  return await callReturn<string | null>(
    '/auth',
    withBot({
      method: 'GET',
      allowed: {
        401: () => null,
      },
    })
  );
}

export async function logout() {
  return await callDefault(
    `/auth/signout`,
    withBot({
      method: 'POST',
    })
  );
}

/**
 * Get custom guild info on from backend
 *
 * @param guild Guild ID
 * @return Guild info, or null if bot hasn't joined the guild
 */
export async function fetchGuildInfo(guild: string): Promise<CustomGuildInfo | null> {
  return await callReturn<CustomGuildInfo | null>(
    `/guilds/${guild}`,
    withBot({
      method: 'GET',
      errorOnFail: false,
    })
  );
}

export async function enableFeature(guild: string, feature: string) {
  return await callDefault(
    `/guilds/${guild}/features/${feature}`,
    withBot({
      method: 'POST',
    })
  );
}

export async function disableFeature(guild: string, feature: string) {
  return await callDefault(
    `/guilds/${guild}/features/${feature}`,
    withBot({
      method: 'DELETE',
    })
  );
}

export async function getFeature<K extends keyof CustomFeatures>(
  guild: string,
  feature: K
): Promise<CustomFeatures[K]> {
  return await callReturn<CustomFeatures[K]>(
    `/guilds/${guild}/features/${feature}`,
    withBot({
      method: 'GET',
    })
  );
}

export async function updateFeature<K extends keyof CustomFeatures>(
  guild: string,
  feature: K
): Promise<CustomFeatures[K]> {
  return await callReturn<CustomFeatures[K]>(
    `/guilds/${guild}/features/${feature}`,
    withBot({
      method: 'PATCH',
    })
  );
}
