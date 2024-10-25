import { GetCommentsData } from '@/types/comment-types';
import { fetchWithoutToken } from '../fetch-without-token';

interface GetMyCommentsParams {
  limit: number;
  sessionId: number;
  pageParam?: string | unknown;
}

export const getMyComments = async ({
  limit,
  sessionId,
  pageParam = '',
}: GetMyCommentsParams): Promise<GetCommentsData> => {
  const cursorParams = pageParam ? `&cursor=${pageParam}` : '';
  const response = await fetchWithoutToken(
    'GET',
    `/users/${sessionId}/comments?limit=${limit}${cursorParams}`,
  );
  if (response.ok) {
    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};
