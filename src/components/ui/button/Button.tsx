import LoadingSvg from '@/../public/svg/loading.svg?component';
import { ForwardRefComponent } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef, memo } from 'react';
import { tv } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'rounded-sm text-center transition-colors p-1 fill-white flex justify-center items-center',
  variants: {
    variant: {
      default: 'bg-gray-700/10 hover:bg-gray-700/20 dark:bg-white/10 dark:hover:bg-white/20',
      gradient: 'bg-gradient hover:brightness-110',
      warning: 'bg-orange/30 text-orange hover:brightness-110',
      error: 'bg-red hover:brightness-110',
      bordered: 'border hover:bg-white/10',
    },
    disabled: {
      true: 'bg-gray-300/10 text-gray-300 hover:brightness-100 hover:bg-gray-300/10 hover:opacity-100 disabled:cursor-not-allowed cursor-not-allowed',
    },
    loading: {
      true: 'cursor-progress',
    },
  },
});

export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type SharedProps = {
  variant?: 'default' | 'gradient' | 'bordered' | 'warning' | 'error';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};
export type ButtonProps = SharedProps & NativeButtonProps;

const Button: ForwardRefComponent<HTMLButtonElement, ButtonProps> = memo(
  forwardRef(({ variant = 'default', className, loading, disabled, children, ...props }: ButtonProps, ref) => {
    return (
      <button
        className={buttonStyles({
          variant,
          disabled,
          loading,
          className,
        })}
        disabled={disabled || loading}
        ref={ref}
        {...(props as any)}
      >
        {loading && <LoadingSvg className="mr-1 animate-spin" />}
        {children}
      </button>
    );
  }),
);

Button.displayName = 'Button';
export default Button;
