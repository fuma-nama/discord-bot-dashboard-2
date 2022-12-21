import { createI18n, initI18n, initLanguages } from 'hooks/i18n';
import { useSettingsStore } from 'stores';

/**
 * Supported languages
 */
export type Languages = 'en' | 'cn';
export const { languages, names } = initLanguages<Languages>({
  en: 'English',
  cn: 'Chinese',
});

const provider = initI18n({
  getLang: () => useSettingsStore.getState().lang,
  useLang: () => useSettingsStore((s) => s.lang),
});

const en = {
  common: {
    'select lang': 'Select your language',
  },
  home: {
    music: 'Music',
    'reaction role': 'Reaction Role',
    'auto moderator': 'Auto Moderator',
    'next gen discord bot': 'Next-gen Discord Bot',
    'play music anywhere': 'Play music anywhere',
    'reaction role description': 'Give user a role when clicking on a button or reaction',
    'auto moderator description': 'Keep your server safe and clean',
    'trusted by': ['Trusted by ', ' servers'],
  },
  auth: {
    login: 'Login',
    'login description': 'Login to your Discord Account',
  },
};

const cn: typeof en = {
  common: {
    'select lang': '選擇你的語言',
  },
  home: {
    music: '音樂',
    'reaction role': '反應角色',
    'auto moderator': '自動管理',
    'next gen discord bot': '下一代 Discord 機器人',
    'play music anywhere': '隨處播放音樂',
    'reaction role description': '單擊按鈕或反應時為用戶賦予角色',
    'auto moderator description': '確保您的服務器安全免受襲擊',
    'trusted by': ['受到', '個服務器的信任'],
  },
  auth: {
    login: '登錄',
    'login description': '登錄您的 Discord 帳戶',
  },
};

export const common = createI18n<typeof en['common']>(provider, {
  cn: cn.common,
  en: en.common,
});

export const home = createI18n<typeof en['home']>(provider, {
  cn: cn.home,
  en: en.home,
});

export const auth = createI18n<typeof en['auth']>(provider, {
  cn: cn.auth,
  en: en.auth,
});
