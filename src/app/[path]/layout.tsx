import { PropsWithChildren } from 'react';

export default function ToolLayout({ children }: PropsWithChildren<{}>) {
  return <div className="flex h-[calc(100dvh-3.75rem)] flex-col overflow-auto p-6 md:p-3">{children}</div>;
}
