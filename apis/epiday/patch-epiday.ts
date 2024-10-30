import { GetEpidayData, PostEpidayData } from '@/types/epiday-types';
import { Session } from 'next-auth/core/types';
import { fetchWithToken } from '../fetch-with-token';

export const patchEpiday = async (
  session: Session,
  id: number,
  data: PostEpidayData,
): Promise<GetEpidayData> => {
  const response = await fetchWithToken('PATCH', `/epigrams/${id}`, session, data);

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '에피데이 수정 실패');
  }
  return response.json();
};
