import { EMOTIONS } from '@/constants/emotions';
import EmotionImage from './emotion-image';
import MainSection from './main-section';

export default function TodayEmotion() {
  return (
    <MainSection title="오늘의 감정은 어떤가요?">
      <ul className="flex justify-center gap-4">
        {EMOTIONS.map((emotion) => (
          <li key={emotion.title} className="flex flex-col items-center gap-2">
            <div className="flex size-24 items-center justify-center rounded-2xl bg-[rgba(175,186,205,0.15)]">
              <EmotionImage type={emotion.title} size="xl" />
            </div>
            <p>{emotion.text}</p>
          </li>
        ))}
      </ul>
    </MainSection>
  );
}
