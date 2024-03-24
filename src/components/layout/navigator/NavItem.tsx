import { delayOpenAnimVariants } from '@/constants/anim';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { motion } from 'framer-motion';

export type NavItemProps = {
  selected?: boolean;
  name?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  className?: ClassValue;
  indicatorClass?: string;
  layoutIdPrefix?: string;
};
function NavItem({ selected, icon, name, onClick, className, indicatorClass, layoutIdPrefix = 'header' }: NavItemProps) {
  return (
    <motion.div variants={delayOpenAnimVariants}>
      <div
        className={cn(
          'relative flex h-full w-full cursor-pointer items-center justify-center text-base',
          selected ? 'text-primary' : ' hover:brightness-75',
          className,
        )}
        onClick={onClick}
      >
        {icon}
        {name}
        {selected && (
          <motion.div
            className={cn('absolute inset-x-0 -bottom-0.5 border-t-2 border-primary', indicatorClass)}
            layoutId={`${layoutIdPrefix ?? 'header'}_tab_selected`}
          />
        )}
      </div>
    </motion.div>
  );
}
export default NavItem;
