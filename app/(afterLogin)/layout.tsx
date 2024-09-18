import NavHeader from '@/components/headers/nav-header';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavHeader />
      {children}
    </>
  );
}
