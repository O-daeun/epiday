import { GetCommentData } from '@/types/comment-types';
import { PostEpidayData } from '@/types/epiday-types';
import { Session } from 'next-auth/core/types';
import { fetchWithToken } from '../fetch-with-token';

export const postEpiday = async (
  session: Session,
  data: PostEpidayData,
): Promise<GetCommentData> => {
  const response = await fetchWithToken('POST', '/epigrams', session, data);
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '에피데이 생성 실패');
  }
  return response.json();
};
