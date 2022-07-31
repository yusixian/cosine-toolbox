import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import Layout from '../components/Layout';
import { RecoilRoot } from 'recoil';

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
        <meta name="description" content="一个专为前端程序员而生的工具站点~" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script id="iconfont-js" src="/js/iconfont.js" strategy="beforeInteractive" />
      {getLayout(<Component {...pageProps} />)}
    </RecoilRoot>
  );
}

export default App;
