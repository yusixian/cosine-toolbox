import { useTheme } from '../../hooks/theme';
import { Footer } from './Footer';
import { Header } from './Header';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const nowClassName = useTheme('flex min-h-screen flex-col bg-cos-gradient', 'bg-cos-gradient-dark');
  return (
    <div className={nowClassName}>
      <Header />
      <main className="relative h-full w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
