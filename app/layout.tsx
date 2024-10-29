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
  openGraph: {
    title: 'Epiday',
    description: '감정상태에 따른 명언과 글귀들을 열람하고 공유하는 서비스',
    url: 'https://epiday.vercel.app',
    siteName: 'Epiday',
    images: [
      {
        url: '/metadata.svg',
        width: 1200,
        height: 900,
        alt: 'Epiday 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
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
