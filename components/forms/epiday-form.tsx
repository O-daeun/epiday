'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../buttons/button';
import InnerLayout from '../inner-layout';
import Input from '../inputs/input';
import Label from '../inputs/label';
import RadioInput from '../inputs/radio-input';
import TagsInput from '../inputs/tags-input';
import Textarea from '../inputs/textarea';

export interface EpidayFormValues {
  tags: string[];
  referenceUrl?: string;
  referenceTitle?: string;
  author: string;
  content: string;
}

interface EpidayResponse {
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
  likeCount: number;
  referenceTitle: string | null;
  referenceUrl: string | null;
  tags: { id: number; name: string }[];
  writerId: number;
}

interface Props {
  data?: EpidayResponse;
  id?: number;
}

export default function EpidayForm({ data, id }: Props) {
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
    trigger('author');
    if (selectedValue === '직접입력') {
      setValue('author', '');
    } else if (selectedValue === '본인') {
      setValue('author', `본인/${selectedValue}`);
    } else {
      setValue('author', selectedValue);
    }
  };

  const handlePost = async (data: EpidayFormValues) => {
    setIsLoading(true);
    try {
      const updatedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== '' && value !== null),
      );
      let response: Response;
      if (id) {
        response = await fetchWithToken('PATCH', `epigrams/${id}`, session, updatedData);
      } else {
        response = await fetchWithToken('POST', 'epigrams', session, updatedData);
      }
      if (response.ok) {
        if (id) {
          showToast({ message: TOAST_MESSAGES.epiday.updateSuccess, type: 'success' });
          router.push(`/epidays/${id}`);
        } else {
          showToast({ message: TOAST_MESSAGES.epiday.createSuccess, type: 'success' });
          const data = await response.json();
          router.push(`/epidays/${data.id}`);
        }
      } else {
        const { message } = await response.json();
        showToast({ message, type: 'error' });
      }
    } catch (error) {
      console.error('작성완료 중 예외 발생: ', error);
      showToast({ message: TOAST_MESSAGES.error, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setValue('content', data.content);
      setValue('author', data.author);
      setValue('referenceTitle', data.referenceTitle);
      setValue('referenceUrl', data.referenceUrl);

      trigger();

      if (data.author === '알수없음') {
        setSelectedAuthor('알수없음');
      } else if (data.author.startsWith('본인')) {
        setSelectedAuthor('본인');
      } else {
        setSelectedAuthor('직접입력');
      }
    }
  }, [data]);

  return (
    <InnerLayout className="py-[136px]">
      <h1 className="mb-10 text-2xl font-semibold text-black">에피데이 만들기</h1>
      <form onSubmit={handleSubmit(handlePost)} className="flex flex-col gap-[54px]">
        <Label label="내용" required>
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
        <Label label="저자" required>
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
          <TagsInput
            setValue={setValue}
            register={register}
            initialTags={data?.tags}
            onFocus={() => {
              trigger('content');
              trigger('author');
            }}
            error={errors.tags?.message}
          />
        </Label>
        <Button type="submit" design="wide" disabled={isLoading || !isValid}>
          작성 완료
        </Button>
      </form>
    </InnerLayout>
  );
}
