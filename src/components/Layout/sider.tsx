'use client';

import { microDampingPreset } from '@/constants/anim';
import { MD_SCREEN_QUERY } from '@/constants/theme/media';
import { useIsMounted } from '@/hooks/common/useIsMounted';
import { useNavItems } from '@/hooks/router';
import { oneLevelTabSelectIdxAtom, siderExpandAtom } from '@/store/app';
import { toolsByCategory } from '@/tools';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Drawer from '../ui/drawer';
import NavItem from './navigator/NavItem';

type SiderProps = {};
const Sider = ({}: SiderProps) => {
  const { buttons } = useNavItems();
  const isMDScreen = useMediaQuery({ query: MD_SCREEN_QUERY });
  const router = useRouter();
  const isMounted = useIsMounted();
  const [selectIdx1, setSelectIdx1] = useAtom(oneLevelTabSelectIdxAtom);
  const [siderExpand, setSiderExpand] = useAtom(siderExpandAtom);

  useEffect(() => {
    if (isMDScreen) setSiderExpand(false);
  }, [isMDScreen, setSiderExpand]);

  const renderContent = useCallback(() => {
    return (
      <div className="flex h-full w-60 flex-col justify-between gap-2 p-2">
        <div className="flex flex-col">
          <div
            className="cursor-pointer rounded border border-border bg-page-background px-2 py-1 hover:bg-background-400"
            onClick={() => {
              router.push('/');
              setSelectIdx1('/');
            }}
          >
            Home
          </div>
          {toolsByCategory.map(({ name, components }, categoryIndex) => (
            <div className="flex flex-col" key={categoryIndex}>
              <h1 className="text-xl font-bold tracking-wide">{name}</h1>
              <div className="flex flex-col">
                {components.map((tool) => {
                  return (
                    <div
                      className="cursor-pointer rounded border border-border bg-page-background px-2 py-1 hover:bg-background-400"
                      key={tool.path}
                      onClick={() => {
                        router.push(tool.path);
                        setSelectIdx1(tool.path);
                      }}
                    >
                      {tool.name}
                    </div>
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
  }, [buttons, router, setSelectIdx1]);
  if (!isMounted) return null;
  return isMDScreen ? (
    <Drawer open={siderExpand} onOpenChange={(open) => setSiderExpand(open)} render={renderContent} />
  ) : (
    <>
      <motion.div
        className="sticky top-0 w-60 bg-background"
        animate={siderExpand ? { x: 0, width: 'auto' } : { x: -300, width: 0 }}
        transition={microDampingPreset}
      >
        {renderContent()}
      </motion.div>
    </>
  );
};

export default Sider;
