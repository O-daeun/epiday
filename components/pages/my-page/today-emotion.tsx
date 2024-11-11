import { getTodayDate } from '@/utils/get-today-date';
import EmotionButtons from '../../buttons/emotion-buttons';
import Section from './section';
import Title from './title';

export default function TodayEmotion() {
  return (
    <Section className="sm:mt-9">
      <div className="flex items-center justify-between">
        <Title>오늘의 감정</Title>
        <span className="text-var-blue-400 sm:text-xl">{getTodayDate()}</span>
      </div>
      <EmotionButtons />
    </Section>
  );
}
