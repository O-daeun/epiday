import AuthHeader from '@/components/headers/auth-header';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <AuthHeader />
      <div className="flex min-h-screen items-center justify-center bg-var-background px-6 py-[160px]">
        <div className="w-full max-w-[640px]">
          <Link href="/" className="mx-auto mb-[60px] block w-fit">
            <Image src="/logo.svg" width={152} height={48} alt="Epiday logo" />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
