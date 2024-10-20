import { GetCommentsData } from '@/types/comment-types';
import { fetchWithoutToken } from '../fetch-without-token';

export const getRecentComments = async ({ pageParam = '' }): Promise<GetCommentsData> => {
  const cursorParams = pageParam ? `&cursor=${pageParam}` : '';
  const response = await fetchWithoutToken('GET', `/comments?limit=4${cursorParams}`);

  if (response.ok) {
    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};
