export type Emotion = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

export interface GetTodayEmotionLog {
  id: number;
  userId: number;
  emotion: Emotion;
  createdAt: string;
}
