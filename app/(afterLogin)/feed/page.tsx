'use client';

import { fetchWithoutToken } from '@/api/fetch-without-token';
import EpidayBox from '@/components/epiday-box';
import { useObserver } from '@/hooks/use-observer';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidaysData } from '@/types/epiday-types';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function FeedPage() {
  const [epidaysData, setEpidaysData] = useState<GetEpidaysData>();
  const [cursor, setCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { showToast } = useToastStore();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchNextCursor = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    const cursorQuery = cursor ? `&cursor=${cursor}` : '';
    const response = await fetchWithoutToken('GET', `/epigrams?limit=10${cursorQuery}`);
    if (response.ok) {
      const data = await response.json();

      if (epidaysData) {
        setEpidaysData((prev) => ({
          ...data,
          list: [...prev.list, ...data.list],
        }));
      } else {
        setEpidaysData(data);
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
    fetchNextCursor();
  }, []);

  useObserver({
    isLoading,
    ref: observerRef,
    fetchNextCursor,
  });

  return (
    <div className="bg-var-background py-[120px]">
      <div className="mx-auto w-full max-w-[1248px] px-6">
        <h1 className="text-2xl font-semibold">피드</h1>
        <ul className="mt-10 grid grid-cols-1 gap-x-[30px] gap-y-10 sm:grid-cols-2">
          {epidaysData?.list.map((epiday) => (
            <li key={epiday.id}>
              <Link href={`/epidays/${epiday.id}`}>
                <EpidayBox epiday={epiday} />
              </Link>
            </li>
          ))}
        </ul>
        <div ref={observerRef} className="h-10" />
        {isLoading && <p>Loading</p>} {/* note: 추후 로딩 ui 구현 */}
      </div>
    </div>
  );
}
