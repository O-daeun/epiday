import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className }: Props) {
  return <section className={`flex flex-col gap-12 ${className}`}>{children}</section>;
}
