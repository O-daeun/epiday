import { getEpidays } from '@/apis/epiday/get-epidays';
import NoContents from '@/components/no-contents';
import SearchEpidayBoxSkeleton from '@/components/skeletons/search-epiday-box-skeleton';
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery<GetEpidaysData>({
      queryKey: queryKeys.epiday.epidaysBySearchKeyword(keyword),
      queryFn: ({ pageParam = '' }) => getEpidays({ limit, pageParam, keyword }),
      getNextPageParam: (lastPage) =>
        lastPage.list.length > 0 ? lastPage.list[lastPage.list.length - 1].id : null,
      staleTime: 1000 * 60 * 5, // 5분
      initialPageParam: '',
    });

  useObserver({
    isLoading: isFetchingNextPage,
    ref: observerRef,
    fetchNextCursor: () => {
      if (hasNextPage) fetchNextPage();
    },
  });

  if (isError) return <p>Error</p>; // note: 에러 구현

  return (
    <ul className="mx-auto mt-6 max-w-[640px] sm:mt-10">
      {isLoading && (
        <>
          <SearchEpidayBoxSkeleton />
          <SearchEpidayBoxSkeleton />
          <SearchEpidayBoxSkeleton />
        </>
      )}
      {data?.pages.map((page) =>
        page.list.map((epiday) => (
          <li key={epiday.id} className="border-b border-var-gray-100">
            <Link href={`/epidays/${epiday.id}`} className="block px-6 py-4 sm:py-6">
              <EpidayPhrase
                content={<HighlightKeyword text={epiday.content} keyword={keyword} />}
                author={epiday.author}
                gap="m"
                authorPosition="left"
              />
              <div className="flex justify-end sm:mt-4">
                <TagList tags={epiday.tags} keyword={keyword} />
              </div>
            </Link>
          </li>
        )),
      )}
      {data?.pages[0].list.length === 0 && <NoContents type="에피데이" />}
      <div ref={observerRef} />
    </ul>
  );
}
