'use client';

import NavHeader from '@/components/headers/nav-header';
import Modal from '@/components/modals/modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NavHeader />
        {children}
        <Modal />
      </QueryClientProvider>
    </SessionProvider>
  );
}
