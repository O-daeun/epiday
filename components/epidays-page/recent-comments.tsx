import { fetchWithoutToken } from '@/api/fetch-without-token';
import { useToastStore } from '@/store/use-toast-store';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { useEffect, useState } from 'react';
import SeeMoreButton from '../buttons/see-more-button';
import Comment from '../comment';
import Section from './section';

export default function RecentComments() {
  const [comments, setComments] = useState<GetCommentsData>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const fetchComments = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const cursorParams = comments ? `&cursor=${comments.nextCursor}` : '';
    const response = await fetchWithoutToken('GET', `/comments?limit=4${cursorParams}`);
    if (response.ok) {
      const data: GetCommentsData = await response.json();

      if (comments) {
        setComments((prev) => ({
          ...data,
          list: [...prev.list, ...data.list],
        }));
      } else {
        setComments(data);
      }
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Section title="최신 댓글" isResponsive className="mt-[160px]">
      <ul>
        {comments?.list.map((comment: GetCommentData) => (
          <li key={comment.id}>
            <Comment comment={comment} onChangeComments={setComments} />
          </li>
        ))}
        {(!comments || comments?.nextCursor) && (
          <SeeMoreButton onClick={fetchComments}>최신 댓글 더보기</SeeMoreButton>
        )}
      </ul>
    </Section>
  );
}
