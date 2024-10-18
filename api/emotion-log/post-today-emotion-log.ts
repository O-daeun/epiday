import { Emotion, GetEmotionLog } from '@/types/emotion-types';
import { Session } from 'next-auth/core/types';
import { fetchWithToken } from '../fetch-with-token';

export const postTodayEmotionLog = async (
  session: Session,
  emotion: Emotion,
): Promise<GetEmotionLog> => {
  const response = await fetchWithToken('POST', '/emotionLogs/today', session, {
    emotion,
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '감정 선택 실패');
  }
  return response.json();
};
