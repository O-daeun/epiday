'use client';

import NavHeader from '@/components/headers/nav-header';
import Modal from '@/components/modals/modal';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <SessionProvider>
      <NavHeader />
      {children}
      <Modal />
    </SessionProvider>
  );
}
