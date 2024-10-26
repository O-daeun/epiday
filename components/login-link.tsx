import Image from 'next/image';
import Link from 'next/link';

export default function LoginLink() {
  return (
    <Link href="/login" className="absolute right-6 top-1/2 -translate-y-1/2 md:right-[120px]">
      <Image src="/profile.svg" width={36} height={36} alt="로그인" />
    </Link>
  );
}
