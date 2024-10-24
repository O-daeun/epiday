'use client';

import { patchEpiday } from '@/api/epiday/patch-epiday';
import { postEpiday } from '@/api/epiday/post-epiday';
import { AUTHOR_VALUE, REFERENCE_URL_DEFAULT_VALUE } from '@/constants/api-constants';
import { queryKeys } from '@/constants/query-keys';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidayData, PostEpidayData } from '@/types/epiday-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

const AUTHOR_RADIOS = [AUTHOR_VALUE.writtenByUser, AUTHOR_VALUE.unknown, AUTHOR_VALUE.myself];

interface Props {
  data?: GetEpidayData;
  id?: number;
}

export default function EpidayForm({ data: formData, id }: Props) {
  const [selectedAuthor, setSelectedAuthor] = useState(AUTHOR_VALUE.writtenByUser);
  const router = useRouter();
  const { showToast } = useToastStore();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<PostEpidayData>({
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  const setFormData = (data: GetEpidayData) => {
    const { content, author, referenceTitle, referenceUrl, tags } = data;
    setValue('content', content);
    setValue('author', author);
    setValue('referenceTitle', referenceTitle);
    setValue('referenceUrl', referenceUrl === REFERENCE_URL_DEFAULT_VALUE ? '' : referenceUrl);
    trigger();
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedAuthor(value);
    const authorValue =
      value === AUTHOR_VALUE.myself ? `${AUTHOR_VALUE.myself}:${session.nickname}` : value;
    setValue('author', value === AUTHOR_VALUE.writtenByUser ? '' : authorValue);
    trigger();
  };

  const mutation = useMutation({
    mutationFn: async (formData: PostEpidayData) => {
      const updatedData = {
        ...formData,
        referenceUrl: !formData.referenceUrl ? REFERENCE_URL_DEFAULT_VALUE : formData.referenceUrl,
        referenceTitle: !formData.referenceTitle ? '' : formData.referenceTitle,
      };
      if (id) {
        return patchEpiday(session, id, updatedData);
      } else {
        return postEpiday(session, updatedData);
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.epiday.allEpidays });
      if (id) {
        showToast({ message: TOAST_MESSAGES.epiday.updateSuccess, type: 'success' });
        router.push(`/epidays/${id}`);
      } else {
        showToast({ message: TOAST_MESSAGES.epiday.createSuccess, type: 'success' });
        router.push(`/epidays/${result.id}`);
      }
    },
    onError: (error: Error) => {
      showToast({ message: error.message || TOAST_MESSAGES.error, type: 'error' });
    },
  });

  useEffect(() => {
    if (formData) {
      setFormData(formData);
      setSelectedAuthor(
        formData.author === AUTHOR_VALUE.unknown
          ? AUTHOR_VALUE.unknown
          : formData.author.startsWith(AUTHOR_VALUE.myself)
            ? AUTHOR_VALUE.myself
            : AUTHOR_VALUE.writtenByUser,
      );
    }
  }, [formData]);

  return (
    <InnerLayout className="py-14">
      <h1 className="mb-10 text-2xl font-semibold text-black">에피데이 만들기</h1>
      <form
        onSubmit={handleSubmit((formData) => mutation.mutate(formData))}
        className="flex flex-col gap-[54px]"
      >
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
            {AUTHOR_RADIOS.map((authorValue) => (
              <RadioInput
                key={authorValue}
                name="author"
                value={authorValue}
                label={authorValue}
                checked={selectedAuthor === authorValue}
                onChange={handleRadioChange}
              />
            ))}
          </div>
          {selectedAuthor === AUTHOR_VALUE.writtenByUser && (
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
            initialTags={formData?.tags}
            onFocus={() => {
              trigger('content');
              trigger('author');
            }}
            error={errors.tags?.message}
          />
        </Label>
        <Button type="submit" design="wide" disabled={mutation.status === 'pending' || !isValid}>
          {id ? '수정 완료' : '작성 완료'}
        </Button>
      </form>
    </InnerLayout>
  );
}
