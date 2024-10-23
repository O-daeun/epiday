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
      className="w-fit rounded-[22px] bg-var-background px-[14px] py-3 text-2xl text-var-black-300"
    >
      {text}
    </button>
  );
}
