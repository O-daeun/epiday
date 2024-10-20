import { GetEpidaysData } from '@/types/epiday-types';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { InfiniteData, QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<InfiniteData<GetEpidaysData, unknown>, Error>>;
}
/**
 * 새로고침 버튼
 * @param refetch react-query의 refetch함수
 */
export default function RefetchButton({ refetch }: Props) {
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefetch = async () => {
    setIsRefetching(true);

    const refetchPromise = refetch();
    const minSpinTime = new Promise((resolve) => setTimeout(resolve, 200));
    await Promise.all([refetchPromise, minSpinTime]);

    setIsRefetching(false);
  };
  return (
    <button onClick={handleRefetch}>
      <ArrowPathIcon
        className={`size-6 stroke-var-blue-500 ${isRefetching ? 'animate-spinFast' : ''}`}
      />
    </button>
  );
}
