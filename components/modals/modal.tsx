'use client';

import { useModalStore } from '@/store/use-modal-store';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal() {
  const { isOpen, content } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 h-full w-full overflow-auto bg-[rgba(0,0,0,0.6)]">
      <div className="absolute inset-0 flex h-fit min-h-full w-full items-center justify-center py-10">
        <div className="h-fit w-fit rounded-3xl bg-white">{content}</div>
      </div>
      ,
    </div>,
    document.body,
  );
}
