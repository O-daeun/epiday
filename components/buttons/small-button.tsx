import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  link?: string;
  className?: string;
}

/**
 *
 * @param link 링크 기능으로 사용하려면 사용
 * @returns
 */
export default function SmallButton({
  children,
  link,
  className = '',
  onClick,
  type = 'button',
  disabled,
  ...rest
}: Props) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (link && !disabled) {
      router.push(link);
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={`rounded-lg bg-var-black-500 px-[14px] py-2 text-xs font-semibold text-white duration-100 hover:bg-var-black-600 active:bg-var-black-700 disabled:bg-var-blue-300 sm:py-[9px] sm:text-base ${className}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
