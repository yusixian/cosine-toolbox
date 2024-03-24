import { childDelayOpenAnimVariants } from '@/constants/anim';
import { microDampingPreset } from '@/constants/anim/spring';
import { siteConfig } from '@/constants/site-config';
import { useScrollHide } from '@/hooks/common/useScrollHide';
import { useNavItems } from '@/hooks/router';
import { cn } from '@/lib/utils';
import { oneLevelTabSelectPathAtom, siderExpandAtom } from '@/store/app';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';
import NavItem from './navigator/NavItem';

export function Header() {
  const router = useRouter();
  const { alternate, title } = siteConfig;
  const isVisible = useScrollHide();
  const [selectPath, setSelectPath] = useAtom(oneLevelTabSelectPathAtom);
  const [siderExpand, setSiderExpand] = useAtom(siderExpandAtom);
  const { routers, buttons } = useNavItems();
  const path = usePathname();

  /** Set SelectIdx When Change Route */
  useEffect(() => {
    for (let i = 0; i < routers.length; i++) {
      if (routers[i].path === path) {
        setSelectPath(path);
        break;
      }
    }
  }, [path, routers, setSelectPath]);

  return (
    <motion.header
      className={cn(
        'sticky inset-x-0 top-0 z-10 flex h-14 select-none items-center gap-4 border-b border-border px-4 py-1 text-black dark:text-white',
      )}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={microDampingPreset}
    >
      <>
        <motion.nav initial={false} animate={siderExpand ? 'open' : 'closed'} className="flex justify-end">
          <motion.div
            whileTap={{ scale: 1.3 }}
            className="relative h-8 w-8"
            onClick={() => setSiderExpand(!siderExpand)}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            <motion.span
              className="absolute inset-0 cursor-pointer text-3xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: siderExpand ? 0 : 1,
                transition: {
                  delay: siderExpand ? 0.1 : 0,
                },
              }}
            >
              <CgMenu />
            </motion.span>
            <motion.span
              className="absolute inset-0 cursor-pointer text-3xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: siderExpand ? 1 : 0,
                transition: {
                  delay: siderExpand ? 0 : 0.1,
                },
              }}
            >
              <CgClose />
            </motion.span>
          </motion.div>
        </motion.nav>
      </>
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ scale: 1.1 }}
        className="flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap text-2xl font-bold"
        onClick={() => router.push('/')}
      >
        <p className="font-candy text-2xl font-light capitalize tracking-widest text-primary">{alternate ?? title}</p>
      </motion.div>
      <motion.div
        initial="closed"
        animate="open"
        variants={childDelayOpenAnimVariants}
        className="ml-4 flex h-full w-full flex-grow gap-4"
      >
        {routers.map(({ name, path, key }) => {
          return (
            <NavItem
              selected={selectPath === path}
              indicatorClass="bottom-0.5"
              className="-mt-0.5 px-2"
              key={key ?? name}
              onClick={() => {
                router.push(path);
                setSelectPath(path);
              }}
              name={name}
            />
          );
        })}
        <div className="ml-auto flex items-center gap-1">
          {buttons.map(({ key, icon, onClick }) => (
            <NavItem className="px-1 py-1" key={key} onClick={onClick} icon={icon} />
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
