'use client';

import { getEpidays } from '@/apis/epiday/get-epidays';
import RefetchButton from '@/components/buttons/refetch-button';
import SeeMoreButton from '@/components/buttons/see-more-button';
import EpidayBox from '@/components/epiday-box';
import EpidayBoxSkeleton from '@/components/skeletons/epiday-box-skeleton';
import { queryKeys } from '@/constants/query-keys';
import { GetEpidaysData } from '@/types/epiday-types';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';

const limit = 8;

export default function FeedPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery<GetEpidaysData>({
      queryKey: queryKeys.epiday.epidays(limit),
      queryFn: async ({ pageParam = '' }) => getEpidays({ limit, pageParam }),
      getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
      staleTime: 1000 * 60 * 5, // 5분
      initialPageParam: '',
    });

  if (isError) return <p>Error</p>; // note: 에러 구현

  return (
    <div className="bg-var-background py-[84px] pb-[160px] sm:py-[200px]">
      <div className="mx-auto w-full max-w-[1248px] px-6">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold sm:text-2xl">피드</h1>
          <RefetchButton refetch={refetch} />
        </div>
        <ul className="ss:grid-cols-2 mt-6 grid grid-cols-1 gap-x-4 gap-y-4 pb-8 sm:mt-10 sm:gap-x-[30px] sm:gap-y-10 sm:pb-12">
          {isLoading &&
            [...Array(8)].map((_, index) => <EpidayBoxSkeleton key={index} isContentLimit />)}
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
