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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-1 overflow-hidden rounded-lg p-4 text-white shadow-lg ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'} ${isVisible ? 'animate-slideIn' : 'animate-slideOut'}`}
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
