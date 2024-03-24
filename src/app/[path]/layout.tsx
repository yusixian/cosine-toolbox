import { PropsWithChildren } from 'react';

export default function ToolLayout({ children }: PropsWithChildren<{}>) {
  return <div className="mb-20 flex flex-col px-6 pt-14">{children}</div>;
}
