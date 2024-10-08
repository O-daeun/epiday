import { ReactNode } from 'react';
import InnerLayout from '../inner-layout';

interface Props {
  title: string;
  isResponsive?: boolean;
  children: ReactNode;
  className?: string;
}

export default function Section({ title, isResponsive = false, children, className = '' }: Props) {
  return (
    <section className={`flex flex-col gap-10 ${className}`}>
      {isResponsive ? (
        <InnerLayout>
          <h1 className="text-2xl font-semibold">{title}</h1>
        </InnerLayout>
      ) : (
        <h1 className="text-2xl font-semibold">{title}</h1>
      )}

      {children}
    </section>
  );
}
