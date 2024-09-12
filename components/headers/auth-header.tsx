import Image from 'next/image';
import HeaderLayout from './header-layout';
import Link from 'next/link';

export default function AuthHeader() {
  return (
    <HeaderLayout className="justify-center">
      <Link href="/">
        <Image src="/logo.svg" width={114} height={36} alt="Epiday logo" />
      </Link>
    </HeaderLayout>
  );
}
