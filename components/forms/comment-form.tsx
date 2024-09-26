import { fetchWithToken } from '@/api/fetch-with-token';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { useSession } from 'next-auth/react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import SmallButton from '../buttons/small-button';

interface Props {
  onChangeComments: Dispatch<SetStateAction<GetCommentsData>>;
  comment?: GetCommentData;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function CommentForm({ onChangeComments, comment, onEdit, className = '' }: Props) {
  const [content, setContent] = useState(comment?.content || '');
  const [isPrivate, setIsPrivate] = useState(comment.isPrivate);
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToastStore();
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() === '') {
      showToast({ message: '댓글을 입력해 주세요.', type: 'error' });
      return;
    }
    try {
      setIsLoading(true);

      const response = await fetchWithToken('PATCH', `/comments/${comment.id}`, session, {
        isPrivate,
        content,
      });
      if (response.ok) {
        if (comment) {
          showToast({ message: TOAST_MESSAGES.comment.updateSuccess, type: 'success' });
          onEdit(false);
          onChangeComments((prev) => ({
            ...prev,
            list: prev.list.map((item: GetCommentData) =>
              item.id === comment.id ? { ...item, content, isPrivate } : item,
            ),
          }));
        } else {
          setContent('');
          setIsPrivate(false);
          showToast({ message: TOAST_MESSAGES.comment.createSuccess, type: 'success' });
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

  return (
    <form onSubmit={handleSubmit} className={className}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="h-[104px] w-full grow rounded-lg border border-var-line-200 px-4 py-3 text-xl outline-none placeholder:text-var-blue-400"
        placeholder="100자 이내로 입력해주세요."
      />
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
        <SmallButton type="submit" disabled={isLoading} className="!w-15">
          저장
        </SmallButton>
      </div>
    </form>
  );
}
