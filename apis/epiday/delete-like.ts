import { GetEpidayData } from '@/types/epiday-types';
import { Session } from 'next-auth/core/types';
import { fetchWithToken } from '../fetch-with-token';

export const deleteLike = async (session: Session, id: number): Promise<GetEpidayData> => {
  const response = await fetchWithToken('DELETE', `/epigrams/${id}/like`, session);

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '좋아요 취소 실패');
  }
  return response.json();
};
