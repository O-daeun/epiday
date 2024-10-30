import { GetEpidayData } from '@/types/epiday-types';
import { fetchWithoutToken } from '../fetch-without-token';

export const getTodayEpiday = async (): Promise<GetEpidayData | null> => {
  const response = await fetchWithoutToken('GET', '/epigrams/today');
  if (response.ok) {
    // No document일 경우 컴포넌트 자체가 안 보이도록 함
    if (response.status === 204) return null;

    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message || 'API 호출 중 오류 발생');
  }
};
