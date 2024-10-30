import { GetCommentData } from '@/types/comment-types';
import { Session } from 'next-auth/core/types';
import { fetchWithToken } from '../fetch-with-token';

export const postComment = async (
  session: Session,
  data: { epigramId: number; isPrivate: boolean; content: string },
): Promise<GetCommentData> => {
  const response = await fetchWithToken('POST', '/comments', session, data);
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '감정 선택 실패');
  }
  return response.json();
};
