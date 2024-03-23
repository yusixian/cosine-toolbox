'use client';

import { ProviderComposer } from '@/components/common/ProviderComposer';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { ReactElement } from 'react';

const contexts: JSX.Element[] = [
  <ThemeProvider attribute="class" key="ThemeProvider" />,
  <JotaiProvider key="JotaiProvider" />,
];
export default function Providers({ children }: { children: ReactElement }) {
  return <ProviderComposer contexts={contexts}>{children}</ProviderComposer>;
}
