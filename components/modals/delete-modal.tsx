import { deleteComment } from '@/apis/comment/delete-comment';
import { deleteEpiday } from '@/apis/epiday/delete-epiday';
import { queryKeys } from '@/constants/query-keys';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useModalStore } from '@/store/use-modal-store';
import { useToastStore } from '@/store/use-toast-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ModalButton from './modal-button';

interface Props {
  id: number;
  type: 'comment' | 'epiday';
}

export default function DeleteModal({ id, type }: Props) {
  const { closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      type === 'comment' ? deleteComment(session, id) : deleteEpiday(session, id);
    },
    onSuccess: () => {
      if (type === 'comment') {
        showToast({ message: TOAST_MESSAGES.comment.deleteSuccess, type: 'success' });
        queryClient.invalidateQueries({ queryKey: queryKeys.comment.allComments });
      } else {
        showToast({ message: TOAST_MESSAGES.epiday.deleteSuccess, type: 'success' });
        router.push('/mypage');
      }
      closeModal();
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'error' });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
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
