'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import { useToastStore } from '@/store/use-toast-store';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  id: number;
  number: number;
}

export default function LikeButton({ id, number }: Props) {
  const { data: session } = useSession();
  const { showToast } = useToastStore();
  const [likeCount, setLikeCount] = useState(number);

  const handleClick = async () => {
    const response = await fetchWithToken('POST', `/epigrams/${id}/like`, session);
    if (response.ok) {
      setLikeCount(likeCount + 1);
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-12 w-fit items-center gap-[6px] rounded-full bg-var-black-600 pl-[14px] pr-5 duration-100 ease-in-out hover:shadow-md"
    >
      <Image src="/like.svg" width={36} height={36} alt="좋아요" />
      <span className="text-xl font-medium text-var-blue-100">{likeCount}</span>
    </button>
  );
}
