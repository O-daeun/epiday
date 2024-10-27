import Toast from '@/components/toast';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Epiday',
  description: '감정상태에 따른 명언과 글귀들을 열람하고 공유하는 서비스',
  icons: {
    icon: '/favicon.ico',
  },
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        {children}
        <Toast />
      </body>
    </html>
  );
}
