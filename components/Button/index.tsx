import clsx from 'clsx';
import { CSSProperties, forwardRef, LegacyRef, MouseEventHandler, ReactNode, useMemo } from 'react';

export type ButtonProps = {
  /** 按钮类型 */
  type?: 'default' | 'primary' | 'secondary' | 'link' | 'unstyle';
  /** 按钮大小 */
  size?: 'large' | 'middle' | 'small';
  /** 点击事件 */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** 是否为危险按钮（红色警告） */
  danger?: boolean;
  /** 是否为幽灵按钮 */
  ghost?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  isSubmit?: boolean;
  /** 组件额外的 CSS className */
  className?: string;
  /** 组件额外的 CSS style */
  style?: CSSProperties;

  /** 子组件 */
  children?: ReactNode;
  /** Loading图标 CSS className */
  iconClassName?: string;
  /** Loading图标参数 */
};

const ButtonClass = {
  sizeClass: {
    large: 'py-2 px-5',
    middle: 'py-1 px-4',
    small: 'px-1',
  },
  typeClass: {
    default:
      'border-cos-primary text-cos-primary enabled:hover:opacity-80 dark:border-cos-dark-primary dark:text-cos-dark-primary',
    primary:
      'border-cos-primary bg-cos-primary text-white enabled:hover:opacity-80 dark:border-cos-dark-primary dark:bg-cos-dark-primary',
    secondary: 'bg-rose-400/50 border-rose-400/50 enabled:hover:opacity-80 dark:bg-blue-300 dark:border-blue-300',
    link: 'border-transparent enabled:hover:text-cos-primary dark:enabled:hover:text-cos-dark-primary',
  },
  ghostClass: {
    default: 'border-white text-white enabled:hover:border-cos-primary enabled:hover:text-cos-primary',
    primary: 'border-cos-primary bg-transparent text-cos-primary enabled:hover:opacity-80',
    secondary: '',
    link: 'border-transparent text-white enabled:hover:text-cos-primary',
  },
  dangerClass: {
    default: 'border-dd-danger text-dd-danger enabled:hover:opacity-80',
    primary: 'border-dd-danger bg-dd-danger text-white enabled:hover:opacity-80',
    secondary: '',
    link: 'border-transparent text-dd-danger enabled:hover:opacity-80',
  },
};

const Button = forwardRef(function ButtonInner(
  {
    type,
    size,
    className,
    onClick,
    disabled,
    danger,
    ghost,
    loading,
    style,
    children,
    isSubmit,
  }: // iconClassName,
  // loadingIconProps,
  ButtonProps,
  ref: LegacyRef<HTMLButtonElement>,
) {
  const { sizeClass, typeClass, dangerClass, ghostClass } = ButtonClass;
  const _disabled = disabled || loading;
  const _chooseClass = useMemo(() => {
    if ((danger && ghost) || danger) return dangerClass;
    else if (ghost) return ghostClass;
    else return typeClass;
  }, [danger, dangerClass, ghost, ghostClass, typeClass]);
  return (
    <button
      ref={ref}
      className={
        type === 'unstyle'
          ? className
          : clsx(
              'box-border border transition focus:outline-none',
              sizeClass[size ?? 'middle'],
              _chooseClass[type ?? 'default'],

              _disabled ? 'disabled:cursor-not-allowed disabled:opacity-60' : 'cursor-pointer',
              className,
            )
      }
      style={style}
      onClick={_disabled ? undefined : onClick}
      disabled={_disabled}
      type={isSubmit ? 'submit' : 'button'}
    >
      {/* <Loading show={loading} className={clsx('mr-2', iconClassName)} {...loadingIconProps} /> */}
      {children}
    </button>
  );
});
Button.defaultProps = {
  type: 'default',
  size: 'middle',
  loading: false,
  disabled: false,
  isSubmit: false,
};
export default Button;
