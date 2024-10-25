import { getMyComments } from '@/api/comment/get-my-comments';
import { getEpidays } from '@/api/epiday/get-epidays';
import { queryKeys } from '@/constants/query-keys';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { GetEpidaysData } from '@/types/epiday-types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import SeeMoreButton from '../../buttons/see-more-button';
import Comment from '../../comment';
import EpidayBox from '../../epiday-box';
import InnerLayout from '../../inner-layout';
import NoContents from '../../no-contents';

const limit = 3;

type ActiveNav = 'epiday' | 'comment';

export default function MyWriting() {
  const [activeNav, setActiveNav] = useState<ActiveNav>('epiday');
  const { data: session } = useSession();

  const {
    data: epidays,
    fetchNextPage: fetchNextEpidayPage,
    hasNextPage: hasNextEpidayPage,
    isFetchingNextPage: isFetchingNextEpidayPage,
  } = useInfiniteQuery<GetEpidaysData>({
    queryKey: queryKeys.epiday.myEpidays,
    queryFn: async ({ pageParam = '' }) => getEpidays({ limit, pageParam, writerId: session.id }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
    staleTime: 1000 * 60 * 5, // 데이터를 5분간 신선한 상태로 유지
    refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 갱신
    refetchInterval: 1000 * 60 * 10, // 10분마다 자동으로 최신 데이터 갱신
    initialPageParam: '',
    enabled: !!session,
  });

  const {
    data: comments,
    fetchNextPage: fetchNextCommentPage,
    hasNextPage: hasNextCommentPage,
    isFetchingNextPage: isFetchingNextCommentPage,
  } = useInfiniteQuery<GetCommentsData>({
    queryKey: queryKeys.comment.myComments,
    queryFn: async ({ pageParam = '' }) =>
      getMyComments({ limit, sessionId: session.id, pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
    staleTime: 1000 * 60 * 5, // 데이터를 5분간 신선한 상태로 유지
    refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 갱신
    refetchInterval: 1000 * 60 * 10, // 10분마다 자동으로 최신 데이터 갱신
    initialPageParam: '',
    enabled: !!session,
  });

  const navs: { id: ActiveNav; title: string; count: number }[] = [
    {
      id: 'epiday',
      title: '내 에피데이',
      count: epidays?.pages[0].totalCount,
    },
    {
      id: 'comment',
      title: '내 댓글',
      count: comments?.pages[0].totalCount,
    },
  ];

  return (
    <section className="bg-var-background pb-[87px] pt-[96px]">
      <InnerLayout className="mb-12 flex gap-6">
        {navs.map((nav) => (
          <button
            key={nav.id}
            onClick={() => setActiveNav(nav.id)}
            className={`text-2xl font-semibold ${nav.id === activeNav ? '' : 'text-var-gray-300'}`}
          >
            {nav.title}({nav.count})
          </button>
        ))}
      </InnerLayout>
      {activeNav === 'epiday' && epidays && (
        <>
          {epidays.pages[0].totalCount > 0 ? (
            <InnerLayout>
              <ul className="flex flex-col gap-12">
                {epidays.pages.map((page) =>
                  page.list.map((epiday) => (
                    <li key={epiday.id}>
                      <Link href={`/epidays/${epiday.id}`}>
                        <EpidayBox epiday={epiday} />
                      </Link>
                    </li>
                  )),
                )}
              </ul>
              {hasNextEpidayPage && (
                <SeeMoreButton onClick={fetchNextEpidayPage} disabled={isFetchingNextEpidayPage}>
                  에피데이 더보기
                </SeeMoreButton>
              )}
            </InnerLayout>
          ) : (
            <NoContents type="에피데이" />
          )}
        </>
      )}
      {activeNav === 'comment' && comments && (
        <>
          {comments.pages[0].totalCount > 0 ? (
            <>
              <ul className="flex flex-col">
                {comments.pages.map((page) =>
                  page.list.map((comment: GetCommentData) => (
                    <li key={comment.id}>
                      <Comment comment={comment} isMyPage />
                    </li>
                  )),
                )}
              </ul>
              {hasNextCommentPage && (
                <SeeMoreButton onClick={fetchNextCommentPage} disabled={isFetchingNextCommentPage}>
                  내 댓글 더보기
                </SeeMoreButton>
              )}
            </>
          ) : (
            <NoContents type="댓글" />
          )}
        </>
      )}
    </section>
  );
}
