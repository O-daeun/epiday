import { useEffect, useState } from 'react';
import KeywordButton from './buttons/keyword-button';

interface Props {
  keyword: string;
}

export default function RecentSearch({ keyword }: Props) {
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleDelete = () => {
    localStorage.setItem('searchKeywords', JSON.stringify([]));
    setKeywords([]);
  };

  useEffect(() => {
    const storedKeywords = localStorage.getItem('searchKeywords');
    setKeywords(JSON.parse(storedKeywords));
  }, [keyword]);

  if (keywords.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">최근 검색어</h2>
        <button type="button" onClick={handleDelete} className="font-semibold text-var-error">
          모두 지우기
        </button>
      </div>
      <ul className="mt-10 flex flex-wrap gap-4">
        {keywords?.map((keyword) => (
          <li key={keyword}>
            <KeywordButton text={keyword} />
          </li>
        ))}
      </ul>
    </div>
  );
}
