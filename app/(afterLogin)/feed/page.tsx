'use client';

import { fetchWithoutToken } from '@/api/fetch-without-token';
import SeeMoreButton from '@/components/buttons/see-more-button';
import EpidayBox from '@/components/epiday-box';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidaysData } from '@/types/epiday-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FeedPage() {
  const [epidaysData, setEpidaysData] = useState<GetEpidaysData>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const fetchEpidays = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const cursorParams = epidaysData ? `&cursor=${epidaysData.nextCursor}` : '';
    const response = await fetchWithoutToken('GET', `/epigrams?limit=8${cursorParams}`);
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
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEpidays();
  }, []);

  return (
    <div className="bg-var-background py-[120px]">
      <div className="mx-auto w-full max-w-[1248px] px-6">
        <h1 className="text-2xl font-semibold">피드</h1>
        <ul className="mt-10 grid grid-cols-1 gap-x-[30px] gap-y-10 sm:grid-cols-2">
          {epidaysData?.list.map((epiday) => (
            <li key={epiday.id}>
              <Link href={`/epidays/${epiday.id}`}>
                <EpidayBox epiday={epiday} isContentLimit />
              </Link>
            </li>
          ))}
        </ul>
        {(!epidaysData || epidaysData?.nextCursor) && (
          <SeeMoreButton onClick={fetchEpidays}>에피데이 더보기</SeeMoreButton>
        )}
      </div>
    </div>
  );
}
