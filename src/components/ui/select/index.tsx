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
  onChange?: (value: string) => void;
  placeholder?: string;
  extraContent?: React.ReactNode;
};

const Select = ({ options, value, onChange, className, bordered, placeholder, extraContent }: SelectProps) => {
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
    <div className="relative" ref={ref}>
      <div
        className={cn(
          'flex cursor-pointer select-none items-center justify-between gap-2 text-xs backdrop-blur',
          { 'rounded border border-border bg-background px-4 py-2.5': bordered },
          className,
        )}
        onClick={toggle}
      >
        <div className="flex h-4">
          <div>{select?.label || placeholder || ''}</div>
          {extraContent && select?.label ? extraContent : null}
        </div>
        <IoMdArrowDropdown
          className={cn('h-4 w-4 transition', visible ? 'rotate-180 fill-black dark:fill-white' : 'fill-gray-500')}
        />
      </div>

      {visible && (
        <motion.div
          className={cn(
            'absolute z-20 mt-1 overflow-hidden rounded border border-border bg-background backdrop-blur',
            className,
          )}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {options?.map((option) => (
            <div
              key={option.value}
              className={cn(
                'hover: m-1.5 cursor-pointer rounded px-2 pb-1.5 pt-2 text-xs transition-colors hover:bg-background-400',
                {
                  'bg-background-400': option.value === value,
                },
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
