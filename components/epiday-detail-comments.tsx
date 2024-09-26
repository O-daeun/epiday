'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import { useToastStore } from '@/store/use-toast-store';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Comment from './comment';

interface Props {
  id: number;
}

export default function EpidayDetailComments({ id }: Props) {
  const [comments, setComments] = useState<GetCommentsData>();
  const { showToast } = useToastStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (id && session) {
      const handleLoadComments = async () => {
        const response = await fetchWithToken('GET', `/epigrams/${id}/comments/?limit=10`, session);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          const { message } = await response.json();
          showToast({ message, type: 'error' });
        }
      };
      handleLoadComments();
    }
  }, [id, session]);

  return (
    <section>
      {comments?.list.length > 0 &&
        comments.list.map((comment: GetCommentData) => (
          <Comment key={comment.id} comment={comment} onChangeComments={setComments} />
        ))}
    </section>
  );
}
