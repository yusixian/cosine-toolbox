import { useToggleTheme } from '../../hooks/useToggleTheme';
import Icon from '../Icon';
import { IconType } from '../Icon/type';

export function Header() {
  const toggleTheme = useToggleTheme();

  return (
    <header className="flex h-12 w-full items-center justify-end gap-2 px-2 ">
      <Icon className="text-4xl" type={IconType.LIGHT_OR_DARK} onClick={toggleTheme} />
    </header>
  );
}
