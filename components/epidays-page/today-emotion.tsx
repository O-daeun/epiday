import EmotionButtons from '../buttons/emotion-buttons';
import Title from '../my-page/title';
import Section from './section';

export default function TodayEmotion() {
  return (
    <Section>
      <Title>오늘의 감정은 어떤가요?</Title>
      <EmotionButtons />
    </Section>
  );
}
