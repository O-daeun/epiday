import { getMyComments } from '@/apis/comment/get-my-comments';
import { getEpidays } from '@/apis/epiday/get-epidays';
import CommentSkeleton from '@/components/skeletons/comment-skeleton';
import EpidayBoxSkeleton from '@/components/skeletons/epiday-box-skeleton';
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
    isLoading: isLoadingEpidays,
  } = useInfiniteQuery<GetEpidaysData>({
    queryKey: queryKeys.epiday.myEpidays,
    queryFn: async ({ pageParam = '' }) => getEpidays({ limit, pageParam, writerId: session.id }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
    staleTime: 1000 * 60 * 5, // 5분
    initialPageParam: '',
    enabled: !!session,
  });

  const {
    data: comments,
    fetchNextPage: fetchNextCommentPage,
    hasNextPage: hasNextCommentPage,
    isFetchingNextPage: isFetchingNextCommentPage,
    isLoading: isLoadingComments,
  } = useInfiniteQuery<GetCommentsData>({
    queryKey: queryKeys.comment.myComments,
    queryFn: async ({ pageParam = '' }) =>
      getMyComments({ limit, sessionId: session.id, pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
    staleTime: 1000 * 60 * 5, // 5분
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
    <section className="bg-var-background pb-[150px] pt-14 sm:pb-[200px] sm:pt-[96px]">
      <InnerLayout className="mb-6 flex gap-4 sm:mb-12 sm:gap-6">
        {navs.map((nav) => (
          <button
            key={nav.id}
            onClick={() => setActiveNav(nav.id)}
            className={`font-semibold sm:text-2xl ${nav.id === activeNav ? '' : 'text-var-gray-300'}`}
          >
            {nav.title}
            {nav.count && `(${nav.count})`}
          </button>
        ))}
      </InnerLayout>
      {activeNav === 'epiday' && (
        <InnerLayout>
          <ul className="flex flex-col gap-4 sm:gap-12">
            {(!session || isLoadingEpidays) &&
              [...Array(3)].map((_, index) => <EpidayBoxSkeleton key={index} />)}
            {epidays &&
              (epidays.pages[0].totalCount > 0 ? (
                <>
                  {epidays.pages.map((page) =>
                    page.list.map((epiday) => (
                      <li key={epiday.id}>
                        <Link href={`/epidays/${epiday.id}`}>
                          <EpidayBox epiday={epiday} />
                        </Link>
                      </li>
                    )),
                  )}
                  {hasNextEpidayPage && (
                    <SeeMoreButton
                      onClick={fetchNextEpidayPage}
                      disabled={isFetchingNextEpidayPage}
                    >
                      에피데이 더보기
                    </SeeMoreButton>
                  )}
                </>
              ) : (
                <NoContents type="에피데이" />
              ))}
          </ul>
        </InnerLayout>
      )}

      {activeNav === 'comment' && (
        <>
          {comments && (
            <ul className="flex flex-col">
              {(!session || isLoadingComments) && (
                <>
                  <CommentSkeleton />
                  <CommentSkeleton />
                  <CommentSkeleton />
                </>
              )}
              {comments &&
                (comments.pages[0].totalCount > 0 ? (
                  <>
                    <ul className="flex flex-col">
                      {comments.pages.map((page) =>
                        page.list.map((comment: GetCommentData) => (
                          <li key={comment.id}>
                            <Comment comment={comment} isShowPage />
                          </li>
                        )),
                      )}
                    </ul>
                    {hasNextCommentPage && (
                      <SeeMoreButton
                        onClick={fetchNextCommentPage}
                        disabled={isFetchingNextCommentPage}
                      >
                        내 댓글 더보기
                      </SeeMoreButton>
                    )}
                  </>
                ) : (
                  <NoContents type="댓글" />
                ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
