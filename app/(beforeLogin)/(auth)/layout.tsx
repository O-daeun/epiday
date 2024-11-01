'use client';

import AuthHeader from '@/components/headers/auth-header';
import LogoLink from '@/components/logo-link';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <SessionProvider>
      <AuthHeader />
      <div className="flex min-h-screen items-center justify-center bg-var-background px-6 py-20">
        <div className="w-full max-w-[640px]">
          <LogoLink size="l" className="mx-auto mb-[60px] block w-fit" />
          {children}
          <div className="mb-[60px] mt-[10px] flex items-center justify-end gap-2 pr-2">
            <span className="text-xl font-medium text-var-blue-400">
              {isLoginPage ? '회원이 아니신가요?' : '회원이신가요?'}
            </span>
            <Link
              href={isLoginPage ? '/signup' : '/login'}
              className="border-b-[1.5px] border-var-black-500 text-xl leading-5 text-var-black-500"
            >
              {isLoginPage ? '가입하기' : '로그인하기'}
            </Link>
          </div>
          {/* <SnsLogin /> // 추후 기능 추가 */}
        </div>
      </div>
    </SessionProvider>
  );
}
