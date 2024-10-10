export type Emotion = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';
export type EmotionKorean = '감동' | '기쁨' | '고민' | '슬픔' | '분노';

export interface GetEmotionLog {
  id: number;
  userId: number;
  emotion: Emotion;
  createdAt: string;
}
