import EmotionButtons from '../buttons/emotion-buttons';
import Section from './section';

export default function TodayEmotion() {
  return (
    <Section title="오늘의 감정은 어떤가요?">
      <EmotionButtons />
    </Section>
  );
}
