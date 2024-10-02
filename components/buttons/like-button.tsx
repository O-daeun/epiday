'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import { useToastStore } from '@/store/use-toast-store';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  id: number;
  number: number;
  isInitialLiked: boolean;
}

export default function LikeButton({ id, number, isInitialLiked }: Props) {
  const { data: session } = useSession();
  const { showToast } = useToastStore();
  const [likeCount, setLikeCount] = useState(number);
  const [isLiked, setIsLiked] = useState(isInitialLiked);

  const handleClick = async () => {
    let response;
    if (isLiked) {
      response = await fetchWithToken('DELETE', `/epigrams/${id}/like`, session);
    } else {
      response = await fetchWithToken('POST', `/epigrams/${id}/like`, session);
    }
    if (response.ok) {
      if (isLiked) {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      } else {
        setLikeCount(likeCount + 1);
        setIsLiked(true);
      }
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex h-12 w-fit items-center gap-[6px] rounded-full pl-[14px] pr-5 duration-100 ease-in-out hover:shadow-md ${isLiked ? 'bg-var-illust-purple' : 'bg-var-black-600'}`}
    >
      <Image src="/like.svg" width={36} height={36} alt="좋아요" />
      <span className="text-xl font-medium text-var-blue-100">{likeCount}</span>
    </button>
  );
}
