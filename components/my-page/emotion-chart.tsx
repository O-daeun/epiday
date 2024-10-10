import { GetEmotionLog } from '@/types/emotion-types';
import Section from './section';
import Title from './title';

interface Props {
  formattedYearMonth: string;
  emotionLogs: GetEmotionLog[];
}

export default function EmotionChart({ formattedYearMonth, emotionLogs }: Props) {
  return (
    <Section>
      <Title>감정 차트</Title>
      <div></div>
    </Section>
  );
}
