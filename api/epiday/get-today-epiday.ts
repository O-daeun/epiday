import { GetEpidayData } from '@/types/epiday-types';
import { fetchWithoutToken } from '../fetch-without-token';

export const getTodayEpiday = async (): Promise<GetEpidayData | null> => {
  console.log('getTodayEpiday 호출됨');
  const response = await fetchWithoutToken('GET', '/epigrams/today');
  console.log('잘 되고 있나?', response);
  if (response.ok) {
    if (response.status === 204) return null;

    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message || 'API 호출 중 오류 발생');
  }
};
