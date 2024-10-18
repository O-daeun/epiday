import { GetEmotionLog } from '@/types/emotion-types';
import { fetchWithoutToken } from '../fetch-without-token';

export const getTodayEmotionLog = async (sessionId: number): Promise<GetEmotionLog> => {
  const response = await fetchWithoutToken('GET', `/emotionLogs/today/?userId=${sessionId}`);
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '감정 로드 실패');
  }
  return response.json();
};
