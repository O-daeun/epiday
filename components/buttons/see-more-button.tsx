import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function SeeMoreButton({ onClick, disabled, isLoading, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mx-auto mt-8 flex items-center gap-1 rounded-full border border-var-line-200 px-[18px] py-3 duration-100 hover:shadow-custom sm:mt-20 sm:gap-2 sm:px-10"
    >
      {isLoading ? (
        <span className="text-sm font-medium text-var-blue-500 sm:text-xl">로딩 중...</span>
      ) : (
        <>
          <Image src="/plus.svg" width={24} height={24} alt="더보기" />
          <span className="font-medium text-var-blue-500 sm:text-xl">{children}</span>
        </>
      )}
    </button>
  );
}
