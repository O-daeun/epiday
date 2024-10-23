import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Title({ children, className }: Props) {
  return (
    <h2 className={`text-[32px] font-bold leading-[143.75%] text-var-black-950 ${className}`}>
      {children}
    </h2>
  );
}
