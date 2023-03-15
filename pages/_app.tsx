import '../styles/globals.css';
import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'next-themes';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <RecoilRoot>
      <Head>
        <title>余弦工具箱</title>
      </Head>
      <ThemeProvider attribute="class">{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
