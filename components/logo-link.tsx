import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SIZES = {
  s: { width: 114, height: 36 },
  l: { width: 152, height: 48 },
};
interface Props {
  size?: 's' | 'l';
  className?: string;
}

export default function LogoLink({ className = '', size = 's' }: Props) {
  const pathname = usePathname();
  const isBeforeLogin = pathname === ('/login' || '/signup' || '/');
  return (
    <Link href={isBeforeLogin ? '/' : '/epidays'} className={className}>
      <Image
        src="/logo.svg"
        alt="Epiday logo"
        width={SIZES[size].width}
        height={SIZES[size].height}
        priority
      />
    </Link>
  );
}
