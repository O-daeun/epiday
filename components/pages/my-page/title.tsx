import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Title({ children }: Props) {
  return <h2 className="font-semibold sm:text-2xl">{children}</h2>;
}
