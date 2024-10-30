import { GetEpidaysData } from '@/types/epiday-types';
import { fetchWithoutToken } from '../fetch-without-token';

interface GetEpidaysParams {
  limit: number;
  pageParam?: string | unknown;
  keyword?: string;
  writerId?: number;
}

export const getEpidays = async ({
  limit,
  pageParam = '',
  keyword = '',
  writerId,
}: GetEpidaysParams): Promise<GetEpidaysData> => {
  const cursorParams = pageParam ? `&cursor=${pageParam}` : '';
  const keywordParams = keyword ? `&keyword=${keyword}` : '';
  const writerIdParams = writerId ? `&writerId=${writerId}` : '';
  const response = await fetchWithoutToken(
    'GET',
    `/epigrams?limit=${limit}${cursorParams}${keywordParams}${writerIdParams}`,
  );

  if (response.ok) {
    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};
