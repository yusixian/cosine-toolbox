import LoadingSvg from '@/../public/svg/loading.svg?component';
import { cn } from '@/lib/utils';
import { ForwardRefComponent } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef, memo } from 'react';
import { tv } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'flex items-center justify-center rounded-sm fill-white px-3 py-1.5 text-center text-sm/6 transition-colors',
  variants: {
    variant: {
      default: 'bg-foreground hover:bg-foreground-hover',
      primary: 'bg-primary/20 text-primary hover:bg-primary/30',
      warning: 'bg-orange/20 text-orange hover:bg-orange/30',
      error: 'bg-red-500/30 text-red-500 hover:bg-red-500/40',
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
  variant?: 'default' | 'primary' | 'bordered' | 'warning' | 'error';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};
export type ButtonProps = SharedProps & NativeButtonProps;

const Button: ForwardRefComponent<HTMLButtonElement, ButtonProps> = memo(
  forwardRef(({ variant = 'default', className, loading, disabled, children, ...props }: ButtonProps, ref) => {
    return (
      <button
        className={cn(
          buttonStyles({
            variant,
            disabled,
            loading,
          }),
          className,
        )}
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
