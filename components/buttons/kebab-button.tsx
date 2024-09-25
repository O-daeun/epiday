'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Props {
  id: number;
}

export default function KebabButton({ id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { showToast } = useToastStore();
  const kebabRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    const response = await fetchWithToken('DELETE', `/epigrams/${id}`, session);
    if (response.ok) {
      showToast({ message: TOAST_MESSAGES.epiday.deleteSuccess, type: 'success' });
      router.push('/mypage');
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (kebabRef.current && !kebabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={kebabRef} className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Image src="/kebab.svg" alt="케밥" width={36} height={36} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-11 z-10 w-[134px] rounded-2xl border border-var-blue-400 bg-var-background">
          <Link
            href={`/epidays/${id}/edit`}
            className="flex h-14 items-center justify-center text-xl"
          >
            수정하기
          </Link>
          <button
            onClick={handleDelete}
            className="flex h-14 w-full items-center justify-center text-xl"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
