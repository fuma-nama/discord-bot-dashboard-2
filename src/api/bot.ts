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
