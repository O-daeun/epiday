import { GetEpidaysData } from '@/types/epiday-types';
import { fetchWithoutToken } from '../fetch-without-token';

interface GetEpidaysParams {
  limit: number;
  pageParam?: string | unknown;
  keyword?: string;
}

export const getEpidays = async ({
  limit,
  pageParam = '',
  keyword = '',
}: GetEpidaysParams): Promise<GetEpidaysData> => {
  const keywordParams = keyword ? `&keyword=${keyword}` : '';
  const cursorParams = pageParam ? `&cursor=${pageParam}` : '';
  const response = await fetchWithoutToken(
    'GET',
    `/epigrams?limit=${limit}${keywordParams}${cursorParams}`,
  );

  if (response.ok) {
    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};
