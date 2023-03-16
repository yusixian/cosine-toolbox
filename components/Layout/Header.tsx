import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { Theme, ToastContainer } from 'react-toastify';
import { RouterType, toolsMap } from '../../constants';
import { useToggleTheme } from '../../hooks/useToggleTheme';
import Icon from '../Icon';
import { IconType } from '../Icon/type';

export function Header() {
  const toggleTheme = useToggleTheme();
  const router = useRouter();
  const renderTitle = () => {
    const path = router?.pathname?.slice(1);
    if (!Object.values(RouterType).includes(path as RouterType)) return '';
    return toolsMap[path as RouterType].pageTitle;
  };
  const { theme } = useTheme();

  return (
    <header className="flex h-16 w-full items-center justify-between gap-2 p-2">
      <ToastContainer theme={theme as Theme} autoClose={2000} />
      <div className="flex-grow cursor-pointer" onClick={() => router.push('/')}>
        <img src="/favicon.ico" alt="logo" className="aspect-square h-12" />
      </div>
      <div className="flex-grow cursor-pointer text-3xl" onClick={() => router.push('/')}>
        {renderTitle()}
      </div>
      <Icon className="text-4xl" type={IconType.LIGHT_OR_DARK} onClick={toggleTheme} />
    </header>
  );
}
