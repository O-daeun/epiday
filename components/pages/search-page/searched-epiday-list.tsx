import { getEpidays } from '@/api/epiday/get-epidays';
import { queryKeys } from '@/constants/query-keys';
import { useObserver } from '@/hooks/use-observer';
import { GetEpidaysData } from '@/types/epiday-types';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRef } from 'react';
import EpidayPhrase from '../../epiday-phrase';
import TagList from '../../tag-list';
import HighlightKeyword from './highlight-keyword';

const limit = 8;

interface Props {
  keyword: string;
}

export default function SearchedEpidayList({ keyword }: Props) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery<GetEpidaysData>({
      queryKey: queryKeys.epiday.searchedEpidays(keyword),
      queryFn: ({ pageParam = '' }) => getEpidays({ limit, pageParam, keyword }),
      getNextPageParam: (lastPage) =>
        lastPage.list.length > 0 ? lastPage.list[lastPage.list.length - 1].id : null,
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      initialPageParam: '',
    });

  useObserver({
    isLoading: isFetchingNextPage,
    ref: observerRef,
    fetchNextCursor: () => {
      if (hasNextPage) fetchNextPage(); // 다음 페이지가 존재하면 추가로 데이터 로드
    },
  });

  if (isLoading) return <p>Loading...</p>; // note: 로딩구현
  if (isError) return <p>Error</p>; // note: 에러 구현

  return (
    <ul className="mx-auto mt-10 max-w-[640px]">
      {data?.pages.map((page) =>
        page.list.map((epiday) => (
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
        )),
      )}
      <div ref={observerRef} />
    </ul>
  );
}
