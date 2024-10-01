import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface Props {
  keyword: string;
}

export default function SearchForm({ keyword }: Props) {
  const [text, setText] = useState(keyword || '');
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${text}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-20 items-center border-b-4 border-var-blue-800">
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="h-full grow text-2xl text-var-black-700 outline-none"
      />
      <button type="submit">
        <Image src="/search.svg" width={36} height={36} alt="검색" />
      </button>
    </form>
  );
}
