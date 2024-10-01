import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function InnerLayout({ children, className = '' }: Props) {
  return <div className={`mx-auto w-full max-w-[688px] px-6 ${className}`}>{children}</div>;
}
