'use client';

import Button from '@/components/buttons/button';
import AuthInput from '@/components/inputs/auth-input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
  });
  const router = useRouter();

  const handleLogin = async (data: LoginFormInputs) => {
    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      // memo: 로그인 실패 처리
      console.log(response.error);
    } else {
      router.push('/epidays');
    }
  };

  useEffect(() => {
    if (errors.email) {
      trigger('email');
    }
    if (errors.password) {
      trigger('password');
    }
  }, [errors, trigger]);

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <AuthInput
        {...register('email', {
          required: '이메일은 필수 입력입니다.',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '이메일 형식으로 작성해 주세요.',
          },
        })}
        type="email"
        placeholder="이메일"
        className="mb-4"
        error={errors.email?.message}
        onChange={(e) => setValue('email', e.target.value, { shouldValidate: !!errors.email })}
      />
      <AuthInput
        {...register('password', {
          required: '비밀번호는 필수 입력입니다.',
        })}
        type="password"
        placeholder="비밀번호"
        className="mb-6"
        error={errors.password?.message}
        onChange={(e) =>
          setValue('password', e.target.value, { shouldValidate: !!errors.password })
        }
      />
      <Button type="submit" design="wide">
        로그인
      </Button>
    </form>
  );
}
