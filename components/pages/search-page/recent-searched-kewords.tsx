import BoxSkeleton from '@/components/skeletons/box-skeleton';
import { useEffect, useState } from 'react';
import KeywordButton from './keyword-button';

const LOCAL_STORAGE_KEYWORDS_NAME = 'searchKeywords';

interface Props {
  keyword: string;
}

export default function RecentSearchedKewords({ keyword }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleDelete = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYWORDS_NAME, JSON.stringify([]));
    setKeywords([]);
  };

  useEffect(() => {
    const storedKeywords = localStorage.getItem(LOCAL_STORAGE_KEYWORDS_NAME);
    setKeywords(JSON.parse(storedKeywords));
    setIsLoading(false);
  }, [keyword]);

  return (
    <section className="mt-10">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">최근 검색어</h2>
        <button type="button" onClick={handleDelete} className="font-semibold text-var-error">
          모두 지우기
        </button>
      </div>
      <ul className="mt-10 flex flex-wrap gap-4">
        {isLoading &&
          [...Array(2)].map((_, index) => (
            <div
              key={index}
              className="w-fit rounded-[22px] bg-var-background px-[14px] py-6 text-2xl text-var-black-300"
            >
              <BoxSkeleton width="w-14" height="h-4" />
            </div>
          ))}
        {keywords?.map((keyword) => (
          <li key={keyword}>
            <KeywordButton text={keyword} />
          </li>
        ))}
      </ul>
    </section>
  );
}
