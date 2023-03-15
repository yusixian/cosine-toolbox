import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

/**
 * Document
 */
export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="一个专为前端程序员而生的工具站点~" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Henny+Penny&family=Permanent+Marker&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Script id="iconfont-js" src="/js/iconfont.js" strategy="beforeInteractive" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
