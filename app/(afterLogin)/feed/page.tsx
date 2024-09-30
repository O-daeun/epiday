'use client';

import { fetchWithoutToken } from '@/api/fetch-without-token';
import EpidayBox from '@/components/epiday-box';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidaysData } from '@/types/epiday-types';
import { useEffect, useState } from 'react';

export default function FeedPage() {
  const [epidaysData, setEpidaysData] = useState<GetEpidaysData>();
  const { showToast } = useToastStore();

  useEffect(() => {
    const handleLoadData = async () => {
      const response = await fetchWithoutToken('GET', '/epigrams?limit=10');
      if (response.ok) {
        const data = await response.json();
        setEpidaysData(data);
      } else {
        const { message } = await response.json();
        showToast({ message, type: 'error' });
      }
    };
    handleLoadData();
  }, []);

  return (
    <div className="bg-var-background py-[120px]">
      <div className="mx-auto w-full max-w-[1248px] px-6">
        <h1 className="text-2xl font-semibold">피드</h1>
        <ul className="mt-10 grid grid-cols-1 gap-x-[30px] gap-y-10 sm:grid-cols-2">
          {epidaysData?.list.map((epiday) => (
            <li key={epiday.id}>
              <EpidayBox epiday={epiday} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
