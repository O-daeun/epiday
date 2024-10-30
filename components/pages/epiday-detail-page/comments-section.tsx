'use client';

import { getCommentsForEpiday } from '@/apis/comment/get-comments-for-epiday';
import { queryKeys } from '@/constants/query-keys';
import { useObserver } from '@/hooks/use-observer';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import Comment from '../../comment';
import InnerLayout from '../../inner-layout';
import NoContents from '../../no-contents';
import WriteComment from './write-comment';

const limit = 7;

interface Props {
  id: number;
}

export default function CommentsSection({ id }: Props) {
  const { data: session } = useSession();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery<GetCommentsData>({
      queryKey: queryKeys.comment.commentsForEpiday(id),
      queryFn: ({ pageParam = '' }) => getCommentsForEpiday({ limit, pageParam, id, session }),
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
      if (hasNextPage) fetchNextPage();
    },
  });

  if (isLoading) return <p>Loading...</p>; // note: 로딩구현
  if (isError) return <p>Error</p>; // note: 에러 구현

  return (
    <section className="mt-10">
      <InnerLayout>
        <span className="text-xl font-medium">댓글 ({data?.pages[0].totalCount})</span>
        <WriteComment id={id} />
      </InnerLayout>

      {data?.pages[0].totalCount > 0 && (
        <ul>
          {data.pages.map((page) =>
            page.list.map((comment: GetCommentData) => (
              <li key={comment.id}>
                <Comment comment={comment} />
              </li>
            )),
          )}
        </ul>
      )}
      {data?.pages[0].totalCount === 0 && <NoContents type="댓글" />}
      <div ref={observerRef} className="h-10" />
      {/* note: 추후 loading ui 구현 */}
      {isLoading && <p>Loading</p>}
    </section>
  );
}
