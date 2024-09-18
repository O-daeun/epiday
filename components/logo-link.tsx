import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export default function LogoLink({ className = '', width = 131, height = 36 }: Props) {
  return (
    <Link href="/" className={className}>
      <Image src="/logo.svg" alt="Epiday logo" width={width} height={height} />
    </Link>
  );
}
