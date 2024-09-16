'use client';

import Button from '@/components/buttons/button';
import AuthInput from '@/components/inputs/auth-input';
import { useToastStore } from '@/store/use-toast-store';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm<LoginFormInputs>({
    mode: 'onTouched',
    criteriaMode: 'all',
  });
  const router = useRouter();
  const { showToast } = useToastStore();

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const response = await signIn('credentials', {
        method: 'POST',
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response.ok) {
        router.push('/epidays');
      } else {
        showToast({ message: response.error, type: 'error' });
        if (response.error.includes('이메일') && emailRef.current) {
          emailRef.current.focus();
          emailRef.current.setSelectionRange(
            emailRef.current.value.length,
            emailRef.current.value.length,
          );
        } else if (response.error.includes('비밀번호') && passwordRef.current) {
          passwordRef.current.focus();
          passwordRef.current.setSelectionRange(
            passwordRef.current.value.length,
            passwordRef.current.value.length,
          );
        }
      }
    } catch (error) {
      console.error('로그인 중 예외 발생: ', error);
      showToast({ message: '로그인 중 오류가 발생했습니다.', type: 'error' });
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    if (errors.email && emailRef.current) {
      emailRef.current.focus();
      emailRef.current.setSelectionRange(
        emailRef.current.value.length,
        emailRef.current.value.length,
      );
    }
    if (errors.password && passwordRef.current) {
      passwordRef.current.focus();
      passwordRef.current.setSelectionRange(
        passwordRef.current.value.length,
        passwordRef.current.value.length,
      );
    }
  }, [errors]);

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
        placeholder="이메일"
        className="mb-4"
        error={errors.email?.message}
        ref={emailRef}
        onChange={(e) => setValue('email', e.target.value, { shouldValidate: true })}
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
        ref={passwordRef}
        onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })}
      />
      <Button type="submit" design="wide" disabled={isLoading || !isValid}>
        로그인
      </Button>
    </form>
  );
}
