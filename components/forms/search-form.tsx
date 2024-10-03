import { useToastStore } from '@/store/use-toast-store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

interface Props {
  keyword: string;
}

export default function SearchForm({ keyword }: Props) {
  const [text, setText] = useState(keyword || '');
  const { showToast } = useToastStore();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      showToast({ message: '검색어를 입력해 주세요.', type: 'error' });
      return;
    }

    const storedKeywords = localStorage.getItem('searchKeywords');
    let keywordList: string[] = JSON.parse(storedKeywords) ? JSON.parse(storedKeywords) : [];

    if (text && !keywordList.includes(text)) {
      keywordList.unshift(text);
      if (keywordList.length > 10) {
        keywordList.pop();
      }
      localStorage.setItem('searchKeywords', JSON.stringify(keywordList));
    }

    router.push(`/search?keyword=${text}`);
  };

  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);

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
