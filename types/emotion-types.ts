export type Emotion = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

export interface GetEmotionLog {
  id: number;
  userId: number;
  emotion: Emotion;
  createdAt: string;
}
