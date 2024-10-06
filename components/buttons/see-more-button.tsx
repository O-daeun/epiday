import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  onClick: () => void;
  children: ReactNode;
}

export default function SeeMoreButton({ onClick, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:shadow-custom mx-auto mt-20 flex gap-2 rounded-full border border-var-line-200 px-10 py-3 duration-100"
    >
      <Image src="/plus.svg" width={24} height={24} alt="더보기" />
      <span className="text-xl font-medium text-var-blue-500">{children}</span>
    </button>
  );
}
