import { useRouter } from 'next/router';
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
  return (
    <header className="min-h-20 flex w-full items-center justify-between gap-2 px-2 py-4">
      <div className="cursor-pointer" onClick={() => router.push('/')}>
        <img src="/favicon.ico" alt="logo" className="aspect-square h-12" />
      </div>
      <div className="flex-grow cursor-pointer whitespace-pre-wrap text-center text-3xl" onClick={() => router.push('/')}>
        {renderTitle()}
      </div>
      <Icon className="text-4xl" type={IconType.LIGHT_OR_DARK} onClick={toggleTheme} />
    </header>
  );
}
