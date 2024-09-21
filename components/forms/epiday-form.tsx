'use client';

import { baseUrl } from '@/constants/api-constants';
import { useToastStore } from '@/store/use-toast-store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../buttons/button';
import InnerLayout from '../inner-layout';
import Input from '../inputs/input';
import Label from '../inputs/label';
import RadioInput from '../inputs/radio-input';
import Textarea from '../inputs/textarea';

interface EpidayFormValues {
  tags: string[];
  referenceUrl?: string;
  referenceTitle?: string;
  author: string;
  content: string;
}

export default function EpidayForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<EpidayFormValues>({
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  const router = useRouter();
  const { showToast } = useToastStore();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('직접입력');

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setSelectedAuthor(selectedValue);
    if (selectedValue === '직접입력') {
      setValue('author', '');
    } else {
      setValue('author', selectedValue);
    }
  };

  const handlePost = async (data: EpidayFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/epigrams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast({ message: '에피데이 작성이 완료되었습니다.', type: 'success' });
        router.push('/'); // note: 상세페이지로 이동
      } else {
        const { message } = await response.json();
        showToast({ message, type: 'error' });
      }
    } catch (error) {
      console.error('작성완료 중 예외 발생: ', error);
      showToast({ message: '작성완료 중 오류가 발생했습니다.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InnerLayout className="py-[136px]">
      <h1 className="mb-10 text-2xl font-semibold text-black">에피데이 만들기</h1>
      <form onSubmit={handleSubmit(handlePost)} className="flex flex-col gap-[54px]">
        <Label label="내용" isRequired>
          <Textarea
            error={errors.content?.message}
            placeholder="500자 이내로 입력해주세요."
            maxLength={500}
            {...register('content', {
              required: '내용을 입력해주세요.',
              onChange: () => trigger('content'),
            })}
          />
        </Label>
        <Label label="저자" isRequired>
          <div className="mb-4 flex gap-6">
            <RadioInput
              name="author"
              value="직접입력"
              label="직접 입력"
              checked={selectedAuthor === '직접입력'}
              onChange={handleRadioChange}
            />
            <RadioInput
              name="author"
              value="알수없음"
              label="알 수 없음"
              checked={selectedAuthor === '알수없음'}
              onChange={handleRadioChange}
            />
            <RadioInput
              name="author"
              value="본인"
              label="본인"
              checked={selectedAuthor === '본인'}
              onChange={handleRadioChange}
            />
          </div>
          {selectedAuthor === '직접입력' && (
            <Input
              placeholder="저자 이름 입력"
              error={errors.author?.message}
              onFocus={() => trigger('content')}
              {...register('author', {
                required: '저자 이름을 입력해 주세요.',
                onChange: () => trigger('author'),
              })}
            />
          )}
        </Label>
        <Label label="출처">
          <Input
            placeholder="출처 제목 입력"
            className="mb-4"
            onFocus={() => {
              trigger('content');
              trigger('author');
            }}
            {...register('referenceTitle')}
          />
          <Input
            placeholder="URL (ex. https://www.website.com)"
            onFocus={() => {
              trigger('content');
              trigger('author');
            }}
            error={errors.referenceUrl?.message}
            {...register('referenceUrl', {
              pattern: {
                value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                message: '올바른 URL 형식을 입력해 주세요. (https://...)',
              },
              onChange: () => trigger('referenceUrl'),
            })}
          />
        </Label>
        <Label label="태그">
          <Input
            placeholder="입력하여 태그 작성 (최대 10자)"
            onFocus={() => {
              trigger('content');
              trigger('author');
            }}
          />
        </Label>
        <Button type="submit" design="wide" disabled={isLoading || !isValid}>
          작성 완료
        </Button>
      </form>
    </InnerLayout>
  );
}
