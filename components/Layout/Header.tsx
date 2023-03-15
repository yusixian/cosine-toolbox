import { useRouter } from 'next/router';
import { useToggleTheme } from '../../hooks/useToggleTheme';
import Icon from '../Icon';
import { IconType } from '../Icon/type';

export function Header() {
  const toggleTheme = useToggleTheme();
  const router = useRouter();
  return (
    <header className="flex h-16 w-full items-center justify-between gap-2 p-2">
      <div className="flex-grow cursor-pointer" onClick={() => router.push('/')}>
        <img src="/favicon.ico" alt="logo" className="aspect-square h-12" />
      </div>
      <Icon className="text-4xl" type={IconType.LIGHT_OR_DARK} onClick={toggleTheme} />
    </header>
  );
}
