import { discord } from 'api/discord';
import { bot } from 'api/bot';
import { Options } from './core';

export function withBot<T extends Options>(init?: T): T {
  const temp = localStorage.getItem('session-token');

  return {
    ...init,
    origin: bot,
    init: {
      ...init?.init,
      headers: {
        Authorization: temp != null ? `Bearer ${temp}` : undefined,
      },
      credentials: 'include',
      mode: 'cors',
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
