'use client';

import AuthHeader from '@/components/headers/auth-header';
import SnsLogin from '@/components/sns-login';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  return (
    <div>
      <AuthHeader />
      <div className="flex min-h-screen items-center justify-center bg-var-background px-6 py-[160px]">
        <div className="w-full max-w-[640px]">
          <Link href="/" className="mx-auto mb-[60px] block w-fit">
            <Image src="/logo.svg" width={152} height={48} alt="Epiday logo" />
          </Link>
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
          <SnsLogin />
        </div>
      </div>
    </div>
  );
}
