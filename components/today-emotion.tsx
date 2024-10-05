import EmotionButtons from './buttons/emotion-buttons';
import MainSection from './main-section';

export default function TodayEmotion() {
  return (
    <MainSection title="오늘의 감정은 어떤가요?">
      <EmotionButtons />
    </MainSection>
  );
}
