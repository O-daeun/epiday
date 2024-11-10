'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  link?: string;
  design?: 'main' | 'wide';
  className?: string;
}

/**
 *
 * @param link 링크 기능으로 사용하려면 사용
 * @param design 'main'(기본값): w-64, 'wide': w-full
 * @returns
 */
export default function Button({
  children,
  link,
  className = '',
  design = 'main',
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
      className={`flex h-11 items-center justify-center rounded-xl bg-var-black-500 text-base font-semibold text-white duration-100 hover:bg-var-black-600 active:bg-var-black-700 disabled:bg-var-blue-300 sm:h-16 sm:text-xl ${design === 'main' ? 'w-28 sm:w-64' : 'w-full'} ${className}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
