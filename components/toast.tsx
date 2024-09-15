'use client';

import { useToastStore } from '@/store/useToastStore';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export default function Toast() {
  const { toast, hideToast } = useToastStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => hideToast(), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-1 overflow-hidden rounded-lg p-4 shadow-lg ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}
    >
      {toast.type === 'error' ? (
        <ExclamationCircleIcon className="h-5 w-5 stroke-white" />
      ) : (
        <CheckCircleIcon className="h-5 w-5 stroke-white" />
      )}
      {toast.message}
      <div className="animate-progress absolute bottom-0 left-0 h-1 bg-white"></div>
    </div>
  );
}
