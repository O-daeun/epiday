'use client';

import { deleteLike } from '@/apis/epiday/delete-like';
import { postLike } from '@/apis/epiday/post-like';
import { queryKeys } from '@/constants/query-keys';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidayData } from '@/types/epiday-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Props {
  id: number;
  likeCount: number;
  isLiked: boolean;
}

export default function LikeButton({ id, likeCount, isLiked }: Props) {
  const { data: session } = useSession();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => {
      return isLiked ? deleteLike(session, id) : postLike(session, id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.epiday.epidayDetails(id) });

      const prevEpidayDetails = queryClient.getQueryData(queryKeys.epiday.epidayDetails(id));

      queryClient.setQueryData(queryKeys.epiday.epidayDetails(id), (oldData: GetEpidayData) => ({
        ...oldData,
        likeCount: oldData.isLiked ? oldData.likeCount - 1 : oldData.likeCount + 1,
        isLiked: !oldData.isLiked,
      }));

      return { prevEpidayDetails };
    },
    onError: (error: Error, _, context) => {
      showToast({ message: error.message, type: 'error' });
      queryClient.setQueryData(queryKeys.epiday.epidayDetails(id), context.prevEpidayDetails);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.epiday.epidayDetails(id) });
    },
  });

  return (
    <button
      type="button"
      onClick={() => likeMutation.mutate()}
      className={`flex h-12 w-fit items-center gap-[6px] rounded-full pl-[14px] pr-5 duration-100 ease-in-out hover:shadow-md ${isLiked ? 'bg-var-illust-purple' : 'bg-var-black-600'}`}
    >
      <Image src="/like.svg" width={36} height={36} alt="좋아요" />
      <span className="text-xl font-medium text-var-blue-100">{likeCount}</span>
    </button>
  );
}
