import { provider } from './provider';
import { createI18n } from 'hooks/i18n';

const en = {
  'select lang': 'Select your language',
  dashboard: 'Dashboard',
  profile: 'Profile',
  pages: 'Pages',
};

const cn: typeof en = {
  'select lang': '選擇你的語言',
  dashboard: '儀表板',
  profile: '用戶資料',
  pages: '所有頁面',
};

export const common = createI18n(provider, {
  en,
  cn,
});
