'use client';

import { useModalStore } from '@/store/use-modal-store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import DeleteModal from '../modals/delete-modal';

interface Props {
  id: number;
}

export default function KebabButton({ id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModalStore();
  const kebabRef = useRef<HTMLDivElement>(null);

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
            onClick={() => openModal(<DeleteModal id={id} type="epiday" />)}
            className="flex h-14 w-full items-center justify-center text-xl"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
