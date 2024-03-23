import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Navigator } from '../ui/navigator';
import { cn } from '@/lib/utils';
import { microDampingPreset } from '@/constants/anim/spring';
import { useScrollHide } from '@/hooks/common/useScrollHide';
import { siteConfig } from '@/constants/site-config';

export function Header() {
  const router = useRouter();
  const { alternate, title } = siteConfig;
  const isVisible = useScrollHide();
  // const isBeyond = useScrollBeyond(0);
  return (
    <motion.header
      className={cn('fixed inset-x-0 top-0 z-10 select-none gap-4 border-b border-border px-4 py-1 text-black dark:text-white')}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={microDampingPreset}
    >
      <div className="mx-auto flex max-w-[103.5rem] items-center justify-between">
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
        <Navigator className="h-full flex-grow justify-end" />
      </div>
    </motion.header>
  );
}
