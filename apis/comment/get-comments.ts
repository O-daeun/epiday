import { GetCommentsData } from '@/types/comment-types';
import { fetchWithoutToken } from '../fetch-without-token';

interface GetCommentsParams {
  limit: number;
  pageParam?: string | unknown;
}

export const getComments = async ({
  limit,
  pageParam = '',
}: GetCommentsParams): Promise<GetCommentsData> => {
  const cursorParams = pageParam ? `&cursor=${pageParam}` : '';
  const response = await fetchWithoutToken('GET', `/comments?limit=${limit}${cursorParams}`);

  if (response.ok) {
    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};
