import { atom } from 'recoil';

export type ThemeType = 'light' | 'dark';

export const themeAtom = atom<string>({
  key: 'theme_id',
  default: 'light',
});
