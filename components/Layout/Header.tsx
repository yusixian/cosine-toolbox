import { useRouter } from 'next/router';
import { useToggleTheme } from '../../hooks/useToggleTheme';
import Icon from '../Icon';
import { IconType } from '../Icon/type';

export function Header() {
  const toggleTheme = useToggleTheme();
  const router = useRouter();
  const renderTitle = () => {
    const path = router?.pathname?.slice(7);
    if (path === 'base64download') return 'Base64 图片批量下载';
    else if (path === 'csv2json') return 'CSV转JSON - 在线转换文档文件';
  };
  return (
    <header className="flex h-16 w-full items-center justify-between gap-2 p-2">
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
