import { useRouter } from 'next/navigation';

interface Props {
  text: string;
}

export default function KeywordButton({ text }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/search?keyword=${text}`)}
      className="w-fit rounded-[22px] bg-var-background px-3 py-2 text-var-black-300 sm:px-[14px] sm:py-3 sm:text-2xl"
    >
      {text}
    </button>
  );
}
