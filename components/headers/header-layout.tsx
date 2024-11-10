import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function HeaderLayout({ children, className = '' }: Props) {
  return (
    <header
      className={`fixed left-0 top-0 z-50 flex h-[52px] w-full items-center border-b border-var-gray-150 bg-white sm:h-20 ${className}`}
    >
      {children}
    </header>
  );
}
