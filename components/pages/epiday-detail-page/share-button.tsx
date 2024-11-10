'use client';

import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import Image from 'next/image';

export default function ShareButton() {
  const { showToast } = useToastStore();
  const handleClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        showToast({ message: TOAST_MESSAGES.urlCopy.copySuccess, type: 'success' });
      })
      .catch((error) => {
        console.error('URL 복사에 실패했습니다.', error);
        showToast({ message: TOAST_MESSAGES.urlCopy.copyError, type: 'error' });
      });
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-9 w-fit items-center gap-[6px] rounded-full bg-var-line-100 pl-5 pr-[14px] duration-100 ease-in-out hover:shadow-md sm:h-12"
    >
      <span className="text-sm font-medium text-var-gray-300 sm:text-xl">공유하기</span>
      <Image src="/share.svg" width={36} height={36} alt="공유하기" className="size-5 sm:size-9" />
    </button>
  );
}
