import Image from 'next/image';

interface Props {
  onClick: () => void;
}

export default function SeeMoreButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mt-20 flex gap-2 rounded-full border border-var-line-200 px-10 py-3"
    >
      <Image src="/plus.svg" width={24} height={24} alt="더보기" />
      <span className="text-xl font-medium text-var-blue-500">에피그램 더보기</span>
    </button>
  );
}
