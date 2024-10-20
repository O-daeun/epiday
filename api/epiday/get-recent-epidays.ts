import { GetEpidaysData } from '@/types/epiday-types';
import { fetchWithoutToken } from '../fetch-without-token';

export const getRecentEpidays = async (
  limit: number,
  { pageParam = '' },
): Promise<GetEpidaysData> => {
  const cursorParams = pageParam ? `&cursor=${pageParam}` : '';
  const response = await fetchWithoutToken('GET', `/epigrams?limit=${limit}${cursorParams}`);

  if (response.ok) {
    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};
