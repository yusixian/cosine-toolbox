import clsx from 'clsx';
import { noto_sans_sc, poppins } from '../../constants/font';
import { Footer } from './Footer';
import { Header } from './Header';
import { Theme, ToastContainer } from 'react-toastify';
import { useTheme } from 'next-themes';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        'flex min-h-screen flex-col items-center bg-cos-gradient dark:bg-cos-gradient-dark dark:text-white',
        poppins.variable,
        noto_sans_sc.variable,
      )}
    >
      <ToastContainer
        position="top-center"
        theme={theme as Theme}
        // autoClose={3000}
      />
      <Header />
      <main className="relative h-full w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
