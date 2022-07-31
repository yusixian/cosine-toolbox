import classNames from 'classnames';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { themeAtom } from '../store/theme/state';

/**
 * 它返回一个在明暗之间切换主题的函数。
 * @returns 切换主题的函数
 */
export const useToggleTheme = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const toggleTheme = useCallback(() => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }, [theme, setTheme]);
  return toggleTheme;
};

/**
 * 它需要两个类名，一个用于浅色主题，一个用于深色主题，并根据当前主题返回浅色主题或深色主题的类名。
 * @param {string} initClassName - 将始终应用于元素的类名。
 * @param {string} darkClassName - 主题为深色时将应用的类名
 * @returns {string} 当前主题的类名
 */
export const useTheme = (initClassName: string, darkClassName: string) => {
  const [theme] = useRecoilState(themeAtom);
  return classNames(initClassName, theme === 'light' ? darkClassName : '');
};
