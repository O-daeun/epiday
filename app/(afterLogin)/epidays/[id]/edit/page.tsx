'use client';

import { getEpidayDetails } from '@/apis/epiday/get-epiday-details';
import EpidayForm from '@/components/forms/epiday-form';
import { queryKeys } from '@/constants/query-keys';
import { GetEpidayData } from '@/types/epiday-types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface Props {
  params: { id: number };
}

export default function EpidayEditPage({ params: { id } }: Props) {
  const { data: session } = useSession();

  const {
    data: epiday,
    isLoading,
    isError,
  } = useQuery<GetEpidayData>({
    queryKey: queryKeys.epiday.epidayDetails(id),
    queryFn: () => getEpidayDetails(session, id),
    staleTime: 1000 * 60 * 5, // 5분
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에피데이를 불러올 수 없습니다.</div>;

  return (
    <>
      <EpidayForm data={epiday} id={id} />
    </>
  );
}
