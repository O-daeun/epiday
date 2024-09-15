'use client';

import Button from '@/components/buttons/button';
import AuthInput from '@/components/inputs/auth-input';
import { useToastStore } from '@/store/useToastStore';
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
  const { showToast } = useToastStore();

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response?.error) {
        showToast({ message: response.error, type: 'error' });
      } else {
        router.push('/epidays');
      }
    } catch (error) {
      console.error('로그인 중 예외 발생: ', error);
      showToast({ message: '로그인 중 오류가 발생했습니다.', type: 'error' });
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
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상입니다.',
          },
          pattern: {
            value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
            message: '비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)로만 작성하세요.',
          },
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
