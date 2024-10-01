import { fetchWithToken } from '@/api/fetch-with-token';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { useSession } from 'next-auth/react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import SmallButton from '../buttons/small-button';

interface Props {
  onChangeComments: Dispatch<SetStateAction<GetCommentsData>>;
  id?: number;
  comment?: GetCommentData;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

/**
 * 댓글 작성 및 수정 폼
 * @param onChangeComments 프론트단 comments setter 함수
 * @param id 에피데이 id (댓글 생성일 때만 필요)
 * @param comment 댓글 기존 내용 (댓글 수정일 때만 필요)
 * @param onEdit 프론트단 comment setter 함수 (댓글 수정일 때만 필요)
 * @returns
 */
export default function CommentForm({
  onChangeComments,
  id,
  comment,
  onEdit,
  className = '',
}: Props) {
  const [content, setContent] = useState(comment?.content || '');
  const [isPrivate, setIsPrivate] = useState(comment?.isPrivate || false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenButton, setIsOpenButton] = useState(false);

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
      let response: Response;

      if (comment) {
        response = await fetchWithToken('PATCH', `/comments/${comment.id}`, session, {
          isPrivate,
          content,
        });
      } else {
        response = await fetchWithToken('POST', '/comments', session, {
          epigramId: id,
          isPrivate,
          content,
        });
      }
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
          const newComment = await response.json();

          setContent('');
          setIsPrivate(false);
          showToast({ message: TOAST_MESSAGES.comment.createSuccess, type: 'success' });
          onChangeComments((prev) => ({
            ...prev,
            totalCount: prev.totalCount + 1,
            list: [newComment, ...prev.list],
          }));
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
                disabled={isLoading}
                onClick={() => onEdit(false)}
                className="!bg-var-gray-100 !text-var-black-300"
              >
                취소
              </SmallButton>
            )}
            <SmallButton type="submit" disabled={isLoading}>
              저장
            </SmallButton>
          </div>
        </div>
      )}
    </form>
  );
}
