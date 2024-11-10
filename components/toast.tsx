'use client';

import { useToastStore } from '@/store/use-toast-store';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function Toast() {
  const { toast, hideToast } = useToastStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => hideToast(), 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;
  return (
    <div
      className={`fixed left-[50vw] top-[60px] z-50 flex flex-shrink-0 -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-lg p-4 text-sm text-white shadow-lg sm:top-[85px] sm:text-base ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'} ${isVisible ? 'animate-slideIn' : 'animate-slideOut'}`}
    >
      {toast.type === 'error' ? (
        <ExclamationCircleIcon className="size-5 stroke-white" />
      ) : (
        <CheckCircleIcon className="size-5 stroke-white" />
      )}
      {toast.message}
      <div className="absolute bottom-0 left-0 h-1 animate-progress bg-white"></div>
    </div>
  );
}
