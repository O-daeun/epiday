'use client';

import LandingHeader from '@/components/headers/landing-header';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  return (
    <>
      <LandingHeader />
      {children}
    </>
  );
}
