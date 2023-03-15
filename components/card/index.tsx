import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MouseEventHandler } from 'react';
import Icon from '../Icon';
import { IconType } from '../Icon/type';

type CardProps = {
  title?: string;
  coverUrl?: string;
  className?: string;
  showArrow?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const Card = ({ title, coverUrl, className, showArrow = true, onClick }: CardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ ease: 'linear' }}
      className={clsx(
        'flex w-fit min-w-[12.5rem]  cursor-pointer flex-col rounded bg-rose-200 p-4 text-rose-400 shadow-xl dark:bg-sky-800 dark:text-sky-500',
        className,
      )}
      onClick={onClick}
    >
      {coverUrl && <img src={coverUrl} alt={coverUrl} className="w-full" />}
      <div className="flex w-full items-center justify-between">
        {title && <div className="text-3xl">{title}</div>}
        {showArrow && <Icon type={IconType.ARROW} className="text-3xl" />}
      </div>
    </motion.div>
  );
};
export default Card;
