import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function HeaderLayout({ children, className = '' }: Props) {
  return (
    <header
      className={`fixed z-50 flex h-20 w-full items-center border-b border-var-gray-150 bg-white ${className}`}
    >
      {children}
    </header>
  );
}
