import { discord } from 'api/discord';
import { bot } from 'api/bot';
import { Options } from './core';

export function withBot<T extends Options>(init?: T): T {
  return {
    ...init,
    origin: bot,
    init: {
      ...init?.init,
      credentials: 'include',
    },
  };
}

export function withDiscord<T extends Options>(accessToken: string, options?: T): T {
  const init = options?.init;

  return {
    ...options,
    origin: discord,
    init: {
      ...init,
      headers: {
        ...init?.headers,
        authorization: `Bearer ${accessToken}`,
      },
    },
  };
}
