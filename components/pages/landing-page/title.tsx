import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Title({ children, className }: Props) {
  return (
    <h2
      className={`text-2xl font-bold leading-[143.75%] text-var-black-950 sm:text-[32px] ${className}`}
    >
      {children}
    </h2>
  );
}
