import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  sns: 'google' | 'kakao';
}

export default function SnsLoginButton({ sns, ...rest }: Props) {
  return (
    <button {...rest}>
      <Image src={`/login-${sns}.svg`} alt={sns} width={60} height={60} />
    </button>
  );
}
