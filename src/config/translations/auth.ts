import { provider } from './provider';
import { createI18n } from 'hooks/i18n';

const en = {
  login: 'Login',
  'login description': 'Login to your Discord Account',
};

const cn: typeof en = {
  login: '登錄',
  'login description': '登錄您的 Discord 帳戶',
};

export const auth = createI18n(provider, {
  en,
  cn,
});
