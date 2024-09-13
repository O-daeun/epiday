'use client';

import Button from '@/components/buttons/button';
import AuthInput from '@/components/inputs/auth-input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

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
    <form onSubmit={handleLogin}>
      <AuthInput
        value={email}
        type="email"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <AuthInput
        value={password}
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        className="mb-6"
      />
      <Button type="submit" design="wide">
        로그인
      </Button>
      {error && <p className="text-var-error">{error}</p>}
    </form>
  );
}
