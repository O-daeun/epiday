import { fetchWithToken } from '@/api/fetch-with-token';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useModalStore } from '@/store/use-modal-store';
import { useToastStore } from '@/store/use-toast-store';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import ModalButton from './modal-button';

interface Props {
  id: number;
  type: 'comment' | 'epiday';
  onChangeComments?: Dispatch<SetStateAction<GetCommentsData>>;
}

export default function DeleteModal({ id, type, onChangeComments }: Props) {
  const { closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const { data: session } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    let response;
    if (type === 'comment') {
      response = await fetchWithToken('DELETE', `/comments/${id}`, session);
    } else {
      response = await fetchWithToken('DELETE', `/epigrams/${id}`, session);
    }
    if (response.ok) {
      if (type === 'comment') {
        showToast({ message: TOAST_MESSAGES.comment.deleteSuccess, type: 'success' });
        onChangeComments((prev) => ({
          ...prev,
          totalCount: prev.totalCount - 1,
          list: prev.list.filter((item: GetCommentData) => item.id !== id),
        }));
      } else {
        showToast({ message: TOAST_MESSAGES.epiday.deleteSuccess, type: 'success' });
        router.push('/mypage');
      }
      closeModal();
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
  };
  return (
    <div className="w-[calc(100vw-40px)] max-w-[452px] px-[38px] py-10">
      <div className="flex flex-col items-center">
        <Image src="/bang.svg" width={56} height={56} alt="느낌표" />
        <p className="mt-6 text-2xl font-semibold">
          {type === 'comment' ? '댓글' : '게시물'}을 삭제하시겠어요?
        </p>
        <p className="mt-4 text-lg text-var-gray-400">
          {type === 'comment' ? '댓글' : '게시물'}은 삭제 후 복구할 수 없어요.
        </p>
      </div>
      <div className="mt-10 flex gap-4">
        <ModalButton design="gray" onClick={() => closeModal()}>
          취소
        </ModalButton>
        <ModalButton design="black" onClick={handleDelete}>
          삭제하기
        </ModalButton>
      </div>
    </div>
  );
}
