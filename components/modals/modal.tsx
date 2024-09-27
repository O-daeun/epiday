'use client';

import { useModalStore } from '@/store/use-modal-store';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal() {
  const { isOpen, content, closeModal } = useModalStore();

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
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="h-fit w-fit rounded-3xl bg-white">{content}</div>
    </div>,
    document.body,
  );
}
