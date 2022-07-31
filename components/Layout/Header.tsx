import Icon from '../Icon';
import { useToggleTheme } from '../../hooks/theme';
export function Header() {
  const toggleTheme = useToggleTheme();
  return (
    <header className="flex h-12 w-full items-center justify-end gap-2 px-2 ">
      <Icon className="text-4xl" type="lightOrDark" onClick={() => toggleTheme()} />
      <Icon className="text-4xl" type="search" />
    </header>
  );
}
