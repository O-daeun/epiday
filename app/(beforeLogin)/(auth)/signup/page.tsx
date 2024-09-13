'use client';

import Button from '@/components/buttons/button';
import AuthInput from '@/components/inputs/auth-input';
import AuthLabel from '@/components/inputs/auth-label';
import { baseUrl } from '@/constants/api-constants';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch(`${baseUrl}/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        nickname,
        password,
        passwordConfirmation,
      }),
    });

    if (response.ok) {
      router.push('/login');
    } else {
      const { message } = await response.json();
      setError(message || '회원가입에 실패했습니다.');
    }
  };
  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-10">
      <AuthLabel htmlFor="email" label="이메일">
        <AuthInput
          value={email}
          id="email"
          type="email"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        />
      </AuthLabel>
      <AuthLabel htmlFor="password" label="비밀번호">
        <AuthInput
          value={password}
          id="password"
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthInput
          value={passwordConfirmation}
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </AuthLabel>
      <AuthLabel htmlFor="nickname" label="닉네임">
        <AuthInput
          value={nickname}
          id="nickname"
          placeholder="닉네임"
          onChange={(e) => setNickname(e.target.value)}
        />
      </AuthLabel>
      <Button type="submit" design="wide">
        회원가입
      </Button>
      {error && <p className="text-var-error">{error}</p>}
    </form>
  );
}
