import Link from 'next/link';
import { buttonStyle } from './button-styles';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string;
  className?: string;
  design?: 'main' | 'wide';
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
  if (link)
    return (
      <Link className={`${buttonStyle[design]} ${className}`} href={link} scroll={false}>
        {children}
      </Link>
    );

  return (
    <button
      className={`${buttonStyle[design]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
