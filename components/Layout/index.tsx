import clsx from 'clsx';
import { noto_sans_sc, poppins } from '../../constants/font';
import { Footer } from './Footer';
import { Header } from './Header';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div
      className={clsx(
        'flex min-h-screen flex-col items-center bg-cos-gradient dark:bg-cos-gradient-dark dark:text-white',
        poppins.variable,
        noto_sans_sc.variable,
      )}
    >
      <Header />
      <main className="relative h-full w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
