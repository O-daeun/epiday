import { getComments } from '@/apis/comment/get-comments';
import CommentSkeleton from '@/components/skeletons/comment-skeleton';
import { queryKeys } from '@/constants/query-keys';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import RefetchButton from '../../buttons/refetch-button';
import SeeMoreButton from '../../buttons/see-more-button';
import Comment from '../../comment';
import InnerLayout from '../../inner-layout';
import Title from '../my-page/title';
import Section from './section';

const limit = 3;

export default function RecentCommentsSection() {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery<GetCommentsData>({
      queryKey: queryKeys.comment.comments(limit),
      queryFn: async ({ pageParam = '' }) => getComments({ limit, pageParam }),
      getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
      staleTime: 1000 * 60 * 5, // 데이터를 5분간 신선한 상태로 유지
      refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 갱신
      refetchInterval: 1000 * 60 * 10, // 10분마다 자동으로 최신 데이터 갱신
      initialPageParam: '',
    });

  if (isError) return <p>Error</p>; // note: 에러 구현

  return (
    <Section className="mt-[160px]">
      <InnerLayout className="flex items-center justify-between">
        <Title>최신 댓글</Title>
        <RefetchButton refetch={refetch} />
      </InnerLayout>
      <ul>
        {isLoading && (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        )}
        {data?.pages.map((page) =>
          page.list.map((comment: GetCommentData) => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          )),
        )}
        {hasNextPage && (
          <SeeMoreButton
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            isLoading={isFetchingNextPage}
          >
            최신 댓글 더보기
          </SeeMoreButton>
        )}
      </ul>
    </Section>
  );
}
