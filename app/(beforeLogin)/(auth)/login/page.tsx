'use client';

import Button from '@/components/buttons/button';
import { inputStyle } from '@/components/inputs/input-styles';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (response?.error) {
      // memo: 로그인 메세지 나중에 확인해서 수정
      setError('로그인 실패');
    } else {
      router.push('/epidays');
    }
  };

  return (
    <div className="bg-var-background py-[213px]">
      <div className="mx-auto max-w-[688px] px-6">
        <Link href="/" className="mx-auto mb-[60px] block w-fit">
          <Image src="/logo.svg" width={152} height={48} alt="Epiday logo" />
        </Link>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mb-4 ${inputStyle.auth}`}
            placeholder="이메일"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mb-6 ${inputStyle.auth}`}
            placeholder="비밀번호"
          />
          <Button type="submit" design="wide">
            로그인
          </Button>
        </form>
        {error && <p className="text-var-error">{error}</p>}
      </div>
    </div>
  );
}
