'use client';

import { useIsMounted } from '@/hooks/common/useIsMounted';
import { PropsWithChildren } from 'react';

export const ClientOnly = (props: PropsWithChildren) => {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return <>{props.children}</>;
};
