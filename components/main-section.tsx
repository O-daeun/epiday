import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function MainSection({ title, children }: Props) {
  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {children}
    </section>
  );
}
