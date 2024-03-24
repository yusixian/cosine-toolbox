import Root from '@/components/layout/root';
import { seoConfig } from '@/constants/site-config';
import { fontVariants } from '@/constants/theme/font';
import { cn } from '@/lib/utils';
import Providers from './providers';

import '@/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  metadataBase: seoConfig.url,

  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  openGraph: {
    title: {
      default: seoConfig.title,
    },
    description: seoConfig.description,
    siteName: `${seoConfig.title}`,
    locale: 'zh_CN',
    type: 'website',
    url: seoConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
  },
};

export default async function RootLayout(props: Props) {
  const { children } = props;
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn('vertical-scrollbar m-0 h-full overscroll-none p-0', ...fontVariants)}>
        <Providers>
          <Root>{children}</Root>
        </Providers>
      </body>
    </html>
  );
}
