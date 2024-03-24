'use client';

import { ToastContainer } from 'react-toastify';
import FloatGroup from '../widgets/floatGroup/FloatGroup';
import { Header } from './header';
import Sider from './sider';
import { useTheme } from 'next-themes';

export default function Root({ children }: React.PropsWithChildren<{}>) {
  const { theme } = useTheme();
  return (
    <div className="flex min-h-screen flex-col text-black dark:text-white">
      <div className="relative flex flex-grow">
        <Sider />
        <main className="flex-shrink flex-grow">
          <Header />
          {children}
        </main>
      </div>
      <FloatGroup />
      <ToastContainer theme={theme} />
    </div>
  );
}
