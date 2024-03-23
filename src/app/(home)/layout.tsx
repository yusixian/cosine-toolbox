import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return <div className="mb-20 flex flex-col pt-16">{children}</div>;
}
