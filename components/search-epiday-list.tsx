import { fetchWithoutToken } from '@/api/fetch-without-token';
import { useObserver } from '@/hooks/use-observer';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidaysData } from '@/types/epiday-types';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import EpidayPhrase from './epiday-phrase';
import HighlightKeyword from './highlight-keyword';
import TagList from './tag-list';

interface Props {
  keyword: string;
}

export default function SearchEpidayList({ keyword }: Props) {
  const [epidaysData, setEpidaysData] = useState<GetEpidaysData>();
  const [cursor, setCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { showToast } = useToastStore();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchEpidays = async (isInitialLoad = false) => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);

    const cursorQuery = cursor && !isInitialLoad ? `&cursor=${cursor}` : '';
    const response = await fetchWithoutToken(
      'GET',
      `/epigrams?limit=3&keyword=${keyword}${cursorQuery}`,
    );

    if (response.ok) {
      const data = await response.json();

      if (isInitialLoad) {
        setEpidaysData(data);
      } else {
        setEpidaysData((prev) => ({
          ...data,
          list: prev ? [...prev.list, ...data.list] : data.list,
        }));
      }

      if (data.list.length > 0) {
        const lastEpiday = data.list[data.list.length - 1];
        setCursor(lastEpiday.id);
      } else {
        setHasMore(false);
      }
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setCursor(null);
    setEpidaysData(null);
    setHasMore(true);
    fetchEpidays(true);
  }, [keyword]);

  useObserver({
    isLoading,
    ref: observerRef,
    fetchNextCursor: () => fetchEpidays(false),
  });

  return (
    <ul className="mx-auto mt-10 max-w-[640px]">
      {epidaysData?.list.map((epiday) => (
        <li key={epiday.id} className="border-b border-var-gray-100">
          <Link href={`/epidays/${epiday.id}`} className="block p-6">
            <EpidayPhrase
              content={<HighlightKeyword text={epiday.content} keyword={keyword} />}
              author={epiday.author}
              gap="m"
              authorPosition="left"
            />
            <div className="mt-4 flex justify-end">
              <TagList tags={epiday.tags} keyword={keyword} />
            </div>
          </Link>
        </li>
      ))}
      <div ref={observerRef} />
    </ul>
  );
}
