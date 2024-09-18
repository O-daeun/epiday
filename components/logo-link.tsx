import Image from 'next/image';
import Link from 'next/link';

const SIZES = {
  s: { width: 114, height: 36 },
  l: { width: 152, height: 48 },
};
interface Props {
  size?: 's' | 'l';
  className?: string;
}

export default function LogoLink({ className = '', size = 's' }: Props) {
  return (
    <Link href="/" className={className}>
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
