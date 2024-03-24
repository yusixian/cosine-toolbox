import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React, { useCallback, useMemo, useRef } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useBoolean, useClickAway } from 'react-use';

type SelectProps = {
  bordered?: boolean;
  options?: { label: any; value: string }[];
  value?: string;
  className?: string;
  wrapperClassName?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

const Select = ({ options, value, onChange, className, bordered, placeholder, wrapperClassName }: SelectProps) => {
  const select = useMemo(() => options?.filter((item) => item.value === value)[0], [options, value]);
  const [visible, toggle] = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => toggle(false));

  const handleClick = useCallback(
    (value: string) => {
      onChange?.(value);
      toggle(false);
    },
    [onChange, toggle],
  );

  return (
    <div className={cn('relative', wrapperClassName)} ref={ref}>
      <div
        className={cn(
          'flex cursor-pointer select-none items-center justify-between gap-2 px-4 py-1 text-sm backdrop-blur',
          { 'rounded border border-border bg-foreground': bordered },
          className,
        )}
        onClick={toggle}
      >
        {select?.label || placeholder || ''}
        <IoMdArrowDropdown
          className={cn('h-4 w-4 transition', visible ? 'rotate-180 fill-black dark:fill-white' : 'fill-gray-500')}
        />
      </div>

      {visible && (
        <motion.div
          className={cn('absolute z-20 mt-1 overflow-hidden rounded border border-border bg-foreground backdrop-blur-xl')}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {options?.map((option) => (
            <div
              key={option.value}
              className={cn(
                'm-1.5 cursor-pointer truncate rounded px-2 pb-1.5 pt-2 text-xs transition-colors',
                option.value === value ? 'bg-primary/20 text-primary' : 'hover:bg-foreground-hover',
              )}
              onClick={() => {
                handleClick(option.value);
              }}
            >
              {option.label}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

Select.defaultValue = {
  value: '',
  options: [],
  className: '',
  bordered: false,
};

export default Select;
