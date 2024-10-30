import { GetCommentData } from '@/types/comment-types';
import { Session } from 'next-auth/core/types';
import { fetchWithToken } from '../fetch-with-token';

export const deleteComment = async (session: Session, id: number): Promise<GetCommentData> => {
  const response = await fetchWithToken('DELETE', `/comments/${id}`, session);
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '댓글 삭제 실패');
  }
  return response.json();
};
