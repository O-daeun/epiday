'use client';

import Button from '@/components/buttons/button';
import AuthInput from '@/components/pages/auth-page/auth-input';
import AuthLabel from '@/components/pages/auth-page/auth-label';
import { baseUrl } from '@/constants/api-constants';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SignUpFormInputs {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<SignUpFormInputs>({
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  const router = useRouter();
  const { showToast } = useToastStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: SignUpFormInputs) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/auth/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast({ message: TOAST_MESSAGES.auth.signUpSuccess, type: 'success' });
        router.push('/login');
      } else {
        const { message } = await response.json();
        showToast({ message, type: 'error' });
      }
    } catch (error) {
      console.error('회원가입 중 예외 발생: ', error);
      showToast({ message: TOAST_MESSAGES.auth.signUpError, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-10">
      <AuthLabel htmlFor="email" label="이메일">
        <AuthInput
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식으로 작성해 주세요.',
            },
          })}
          id="email"
          placeholder="이메일"
          error={errors.email?.message}
          onChange={(e) => setValue('email', e.target.value, { shouldValidate: true })}
        />
      </AuthLabel>
      <AuthLabel htmlFor="password" label="비밀번호">
        <AuthInput
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상입니다.',
            },
            pattern: {
              value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
              message: '비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)로만 가능합니다.',
            },
          })}
          id="password"
          type="password"
          placeholder="비밀번호"
          error={errors.password?.message}
          onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })}
        />
        <AuthInput
          {...register('passwordConfirmation', {
            required: '비밀번호 확인은 필수 입력입니다.',
            validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          error={errors.passwordConfirmation?.message}
        />
      </AuthLabel>
      <AuthLabel htmlFor="nickname" label="닉네임">
        <AuthInput
          {...register('nickname', {
            required: '닉네임은 필수 입력입니다.',
          })}
          id="nickname"
          placeholder="닉네임"
          error={errors.nickname?.message}
          maxLength={20}
          onChange={(e) => setValue('nickname', e.target.value, { shouldValidate: true })}
        />
      </AuthLabel>
      <Button type="submit" design="wide" disabled={isLoading || !isValid}>
        회원가입
      </Button>
    </form>
  );
}
