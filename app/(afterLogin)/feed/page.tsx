'use client';

import { getRecentEpidays } from '@/api/epiday/get-recent-epidays';
import SeeMoreButton from '@/components/buttons/see-more-button';
import EpidayBox from '@/components/epiday-box';
import { queryKeys } from '@/constants/query-keys';
import { GetEpidaysData } from '@/types/epiday-types';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';

const limit = 8;

export default function FeedPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery<GetEpidaysData>({
      queryKey: queryKeys.epiday.recentEpidays(limit),
      queryFn: async ({ pageParam = '' }) => getRecentEpidays(limit, pageParam),
      getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
      staleTime: 1000 * 60 * 5, // 데이터를 5분간 신선한 상태로 유지
      refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 갱신
      refetchInterval: 1000 * 60 * 10, // 10분마다 자동으로 최신 데이터 갱신
      initialPageParam: '',
    });

  if (isLoading) return <p>Loading...</p>; // note: 로딩구현
  if (isError) return <p>Error</p>; // note: 에러 구현

  return (
    <div className="bg-var-background py-[120px]">
      <div className="mx-auto w-full max-w-[1248px] px-6">
        <h1 className="text-2xl font-semibold">피드</h1>
        <ul className="mt-10 grid grid-cols-1 gap-x-[30px] gap-y-10 sm:grid-cols-2">
          {data?.pages.map((page) =>
            page.list.map((epiday) => (
              <li key={epiday.id}>
                <Link href={`/epidays/${epiday.id}`}>
                  <EpidayBox epiday={epiday} isContentLimit />
                </Link>
              </li>
            )),
          )}
        </ul>
        {hasNextPage && (
          <SeeMoreButton
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            isLoading={isFetchingNextPage}
          >
            에피데이 더보기
          </SeeMoreButton>
        )}
      </div>
    </div>
  );
}
