'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import { useObserver } from '@/hooks/use-observer';
import { useToastStore } from '@/store/use-toast-store';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import Comment from '../../comment';
import InnerLayout from '../../inner-layout';
import NoContents from '../../no-contents';
import WriteComment from './write-comment';

interface Props {
  id: number;
}

export default function CommentsSection({ id }: Props) {
  const [comments, setComments] = useState<GetCommentsData>();
  const [cursor, setCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { showToast } = useToastStore();
  const { data: session } = useSession();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchNextCursor = async () => {
    if (!hasMore || isLoading || !session) return;

    setIsLoading(true);
    const cursorQuery = cursor ? `&cursor=${cursor}` : '';
    const response = await fetchWithToken(
      'GET',
      `/epigrams/${id}/comments/?limit=7${cursorQuery}`,
      session,
    );

    if (response.ok) {
      const data = await response.json();
      if (comments) {
        setComments((prev) => ({
          ...data,
          list: [...prev.list, ...data.list],
        }));
      } else {
        setComments(data);
      }
      if (data.list.length > 0) {
        const lastComment = data.list[data.list.length - 1];
        setCursor(lastComment.id);
      } else {
        setHasMore(false);
      }
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id && session) {
      fetchNextCursor();
    }
  }, [id, session]);

  useObserver({
    isLoading,
    ref: observerRef,
    fetchNextCursor,
  });

  return (
    <section className="mt-10">
      <InnerLayout>
        {comments && <span className="text-xl font-medium">댓글 ({comments.totalCount})</span>}{' '}
        <WriteComment id={id} onChangeComments={setComments} />
      </InnerLayout>

      {comments?.totalCount > 0 && (
        <ul>
          {comments.list.map((comment: GetCommentData) => (
            <li key={comment.id}>
              <Comment comment={comment} onChangeComments={setComments} />
            </li>
          ))}
        </ul>
      )}
      {comments?.totalCount === 0 && <NoContents type="댓글" />}
      <div ref={observerRef} className="h-10" />
      {isLoading && <p>Loading</p>}
    </section>
  );
}
