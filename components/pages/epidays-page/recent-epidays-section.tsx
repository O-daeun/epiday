import { getEpidays } from '@/apis/epiday/get-epidays';
import EpidayBoxSkeleton from '@/components/skeletons/epiday-box-skeleton';
import { queryKeys } from '@/constants/query-keys';
import { GetEpidaysData } from '@/types/epiday-types';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import RefetchButton from '../../buttons/refetch-button';
import SeeMoreButton from '../../buttons/see-more-button';
import EpidayBox from '../../epiday-box';
import Title from '../my-page/title';
import Section from './section';

const limit = 3;

export default function RecentEpidaysSection() {
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
    <Section>
      <div className="flex items-center justify-between">
        <Title>최신 에피데이</Title>
        <RefetchButton refetch={refetch} />
      </div>
      <ul className="flex flex-col gap-4">
        {isLoading && (
          <>
            <EpidayBoxSkeleton />
            <EpidayBoxSkeleton />
            <EpidayBoxSkeleton />
          </>
        )}
        {data?.pages.map((page) =>
          page.list.map((epiday) => (
            <li key={epiday.id}>
              <Link href={`/epidays/${epiday.id}`}>
                <EpidayBox epiday={epiday} />
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
    </Section>
  );
}
