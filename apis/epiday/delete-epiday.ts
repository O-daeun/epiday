import { GetEpidayData } from '@/types/epiday-types';
import { Session } from 'next-auth/core/types';
import { fetchWithToken } from '../fetch-with-token';

export const deleteEpiday = async (session: Session, id: number): Promise<GetEpidayData> => {
  const response = await fetchWithToken('DELETE', `/epigrams/${id}`, session);
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '댓글 삭제 실패');
  }
  return response.json();
};
