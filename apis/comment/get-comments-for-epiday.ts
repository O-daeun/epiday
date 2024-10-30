import { GetCommentsData } from '@/types/comment-types';
import { Session } from 'next-auth';
import { fetchWithToken } from '../fetch-with-token';

interface GetCommentsForEpidayParams {
  limit: number;
  pageParam?: string | unknown;
  id: number;
  session: Session;
}

export const getCommentsForEpiday = async ({
  limit,
  pageParam = '',
  id,
  session,
}: GetCommentsForEpidayParams): Promise<GetCommentsData> => {
  const cursorParams = pageParam ? `&cursor=${pageParam}` : '';
  const response = await fetchWithToken(
    'GET',
    `/epigrams/${id}/comments/?limit=${limit}${cursorParams}`,
    session,
  );

  if (response.ok) {
    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};
