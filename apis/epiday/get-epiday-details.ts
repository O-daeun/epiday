import { GetEpidayData } from '@/types/epiday-types';
import { Session } from 'next-auth';
import { fetchWithToken } from '../fetch-with-token';

export const getEpidayDetails = async (session: Session, id: number): Promise<GetEpidayData> => {
  const response = await fetchWithToken('GET', `/epigrams/${id}`, session);

  if (response.ok) {
    return response.json();
  } else {
    const { message } = await response.json();
    throw new Error(message || 'API 호출 중 오류 발생');
  }
};
