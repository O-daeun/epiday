import { getRecentComments } from '@/api/comment/get-recent-comments';
import { queryKeys } from '@/constants/query-keys';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import SeeMoreButton from '../buttons/see-more-button';
import Comment from '../comment';
import InnerLayout from '../inner-layout';
import Title from '../my-page/title';
import Section from './section';

export default function RecentComments() {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery<GetCommentsData>({
      queryKey: queryKeys.comment.recentComments,
      queryFn: async ({ pageParam = '' }) => getRecentComments(pageParam),
      getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
      staleTime: 1000 * 60 * 5, // 데이터를 5분간 신선한 상태로 유지
      refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 갱신
      refetchInterval: 1000 * 60 * 10, // 10분마다 자동으로 최신 데이터 갱신
      initialPageParam: '',
    });

  const handleChangeComments = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.comment.allComments });
  };

  if (isLoading) return <p>Loading...</p>; // note: 로딩구현
  if (isError) return <p>Error</p>; // note: 에러 구현

  return (
    <Section className="mt-[160px]">
      <InnerLayout>
        <Title>최신 댓글</Title>
      </InnerLayout>
      <ul>
        {data?.pages.map((page) =>
          page.list.map((comment: GetCommentData) => (
            <li key={comment.id}>
              <Comment comment={comment} onChangeComments={handleChangeComments} />
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
