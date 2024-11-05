import { patchComment } from '@/apis/comment/patch-comment';
import { postComment } from '@/apis/comment/post-comment';
import { queryKeys } from '@/constants/query-keys';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { GetCommentData } from '@/types/comment-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import SmallButton from '../buttons/small-button';

interface Props {
  id?: number;
  comment?: GetCommentData;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

/**
 * 댓글 작성 및 수정 폼
 */
export default function CommentForm({ id, comment, onEdit, className = '' }: Props) {
  const [content, setContent] = useState(comment?.content || '');
  const [isPrivate, setIsPrivate] = useState(comment?.isPrivate || false);
  const [isOpenButton, setIsOpenButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToastStore();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      if (comment) {
        return patchComment(session, comment.id, { isPrivate, content });
      } else {
        return postComment(session, { epigramId: id, isPrivate, content });
      }
    },
    onError: (error) => {
      console.error('작성완료 중 예외 발생: ', error);
      showToast({ message: TOAST_MESSAGES.error, type: 'error' });
    },
    onSuccess: () => {
      setIsLoading(true);
      queryClient.invalidateQueries({ queryKey: queryKeys.comment.allComments });
      setTimeout(() => {
        if (comment) {
          showToast({ message: TOAST_MESSAGES.comment.updateSuccess, type: 'success' });
          onEdit(false);
        } else {
          setContent('');
          setIsPrivate(false);
          showToast({ message: TOAST_MESSAGES.comment.createSuccess, type: 'success' });
        }
        setIsLoading(false);
      }, 300);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() === '') {
      showToast({ message: TOAST_MESSAGES.comment.emptyContentError, type: 'error' });
      return;
    }
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <textarea
        value={content}
        onFocus={() => setIsOpenButton(true)}
        onChange={(e) => setContent(e.target.value)}
        className="h-[104px] w-full grow rounded-lg border border-var-line-200 px-4 py-3 text-xl outline-none placeholder:text-var-blue-400 focus:border-var-black-600"
        placeholder="100자 이내로 입력해주세요."
        maxLength={100}
      />
      {(isOpenButton || comment) && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-var-gray-400">공개</span>
            <button
              type="button"
              onClick={() => setIsPrivate(!isPrivate)}
              className={`relative h-[24px] w-[42px] rounded-full ${isPrivate ? 'bg-var-gray-300' : 'bg-var-black-600'}`}
            >
              <div
                className={`absolute top-1 size-[16px] rounded-full bg-white duration-100 ${isPrivate ? 'left-1' : 'left-[22px]'}`}
              />
            </button>
          </div>
          <div className="flex gap-2">
            {comment && (
              <SmallButton
                type="button"
                disabled={mutation.status === 'pending'}
                onClick={() => onEdit(false)}
                className="!bg-var-gray-100 !text-var-black-300"
              >
                취소
              </SmallButton>
            )}
            <SmallButton type="submit" disabled={mutation.isPending || isLoading}>
              {mutation.isPending || isLoading ? '저장 중...' : '저장'}
            </SmallButton>
          </div>
        </div>
      )}
    </form>
  );
}
