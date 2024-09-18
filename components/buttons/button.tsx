import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string;
  className?: string;
  design?: 'main' | 'wide';
  children: ReactNode;
}

export default function Button({
  children,
  link,
  className = '',
  design = 'main',
  onClick,
  type = 'button',
  disabled,
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
      className={`flex h-16 items-center justify-center rounded-xl bg-var-black-500 text-xl font-semibold text-white duration-100 hover:bg-var-black-600 ${design === 'main' ? 'w-64' : 'w-full'} active:bg-var-black-700 disabled:bg-var-blue-300 ${className}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
