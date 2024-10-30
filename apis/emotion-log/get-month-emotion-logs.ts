import { GetEmotionLog } from '@/types/emotion-types';
import { fetchWithoutToken } from '../fetch-without-token';

export const getMonthEmotionLogs = async (
  sessionId: number,
  year: number,
  month: number,
): Promise<GetEmotionLog[]> => {
  const response = await fetchWithoutToken(
    'GET',
    `/emotionLogs/monthly?userId=${sessionId}&year=${year}&month=${month}`,
  );
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '월별 감정 로드 실패');
  }
  return response.json();
};
