import { CustomGuildInfo } from 'config/custom-types';
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
