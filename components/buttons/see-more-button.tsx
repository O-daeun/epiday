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
      className="mx-auto mt-20 flex items-center gap-2 rounded-full border border-var-line-200 px-10 py-3 duration-100 hover:shadow-custom"
    >
      {isLoading ? (
        <span className="text-xl font-medium text-var-blue-500">로딩 중...</span>
      ) : (
        <>
          <Image src="/plus.svg" width={24} height={24} alt="더보기" />
          <span className="text-xl font-medium text-var-blue-500">{children}</span>
        </>
      )}
    </button>
  );
}
