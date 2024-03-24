'use client';

import { MD_SCREEN_QUERY } from '@/constants/theme/media';
import { useIsMounted } from '@/hooks/common/useIsMounted';
import { useNavItems } from '@/hooks/router';
import { cn } from '@/lib/utils';
import { oneLevelTabSelectPathAtom, siderExpandAtom } from '@/store/app';
import { toolsByCategory } from '@/tools';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Drawer from '../ui/drawer';
import NavItem from './navigator/NavItem';

function SiderItem({ isSelected, onClick, children }: PropsWithChildren<{ isSelected?: boolean; onClick?: () => void }>) {
  return (
    <div
      className={cn(
        'cursor-pointer rounded border border-border bg-foreground px-2 py-1',
        isSelected ? 'border-primary bg-primary/20 text-primary' : 'hover:bg-foreground-hover',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

type SiderProps = {};
const Sider = ({}: SiderProps) => {
  const { buttons } = useNavItems();
  const isMDScreen = useMediaQuery({ query: MD_SCREEN_QUERY });
  const router = useRouter();
  const isMounted = useIsMounted();
  const [selectIdx1, setSelectIdx1] = useAtom(oneLevelTabSelectPathAtom);
  const [siderExpand, setSiderExpand] = useAtom(siderExpandAtom);

  useEffect(() => {
    if (isMDScreen) setSiderExpand(false);
  }, [isMDScreen, setSiderExpand]);

  const renderContent = useCallback(() => {
    return (
      <div className="flex h-full w-full flex-col justify-between gap-2 px-3 pt-4">
        <div className="flex flex-col gap-4">
          <SiderItem
            isSelected={!selectIdx1 || ['/', 'home'].includes(selectIdx1)}
            onClick={() => {
              setSelectIdx1('');
              router.push('/');
            }}
          >
            Home
          </SiderItem>
          {toolsByCategory.map(({ name, components }, categoryIndex) => (
            <div className="flex flex-col gap-2" key={categoryIndex}>
              <h1 className="text-xl font-bold tracking-wide">{name}</h1>
              <div className="flex flex-col">
                {components.map((tool) => {
                  return (
                    <SiderItem
                      key={tool.path}
                      isSelected={selectIdx1 === tool.path}
                      onClick={() => {
                        setSelectIdx1(tool.path);
                        router.push(tool.path);
                      }}
                    >
                      {tool.name}
                    </SiderItem>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {buttons.map(({ key, icon, onClick }) => (
            <NavItem key={key} className="w-full px-1 py-1" onClick={onClick} icon={icon} />
          ))}
        </div>
      </div>
    );
  }, [buttons, router, selectIdx1, setSelectIdx1]);
  if (!isMounted) return null;
  return isMDScreen ? (
    <Drawer open={siderExpand} onOpenChange={(open) => setSiderExpand(open)} render={renderContent} />
  ) : (
    <motion.div
      className={cn('sticky top-0 w-60 flex-shrink-0 bg-background')}
      animate={siderExpand ? { x: 0 } : { x: -300, width: 0 }}
      transition={{ type: 'spring', damping: 18 }}
    >
      {renderContent()}
    </motion.div>
  );
};

export default Sider;
