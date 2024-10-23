import { getTodayDate } from '@/utils/get-today-date';
import EmotionButtons from '../../buttons/emotion-buttons';
import Section from './section';
import Title from './title';

export default function TodayEmotion() {
  return (
    <Section className="mt-9">
      <div className="flex items-center justify-between">
        <Title>오늘의 감정</Title>
        <span className="text-xl text-var-blue-400">{getTodayDate()}</span>
      </div>
      <EmotionButtons />
    </Section>
  );
}
