import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MouseEventHandler, ReactNode } from 'react';
import Icon from '../Icon';
import { IconType } from '../Icon/type';

type CardProps = {
  title?: string;
  layoutId?: string;
  coverUrl?: string;
  children?: ReactNode;
  className?: string;
  showArrow?: boolean;
  clickable?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const Card = ({ title, coverUrl, layoutId, className, showArrow = false, clickable = false, children, onClick }: CardProps) => {
  return (
    <motion.div
      layoutId={layoutId}
      whileHover={clickable ? { y: -5 } : {}}
      transition={{ ease: 'linear' }}
      className={clsx(
        'flex min-w-[12.5rem] flex-col gap-2 rounded bg-rose-200 p-4 text-rose-400 shadow-xl dark:bg-sky-800 dark:text-sky-500',
        { 'cursor-pointer': clickable },
        className,
      )}
      onClick={onClick}
    >
      {coverUrl && <img src={coverUrl} alt={coverUrl} className="w-full" />}
      <div className="flex w-full items-center justify-between">
        {title && <div className="text-3xl">{title}</div>}
        {showArrow && <Icon type={IconType.ARROW} className="text-3xl" />}
      </div>
      {children}
    </motion.div>
  );
};
export default Card;
