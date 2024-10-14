import { fetchWithToken } from '@/api/fetch-with-token';
import { fetchWithoutToken } from '@/api/fetch-without-token';
import { EMOTIONS } from '@/constants/emotions';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { Emotion, GetEmotionLog } from '@/types/emotion-types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import EmotionImage from '../emotion-image';

export default function EmotionButtons() {
  const [activeEmotion, setActiveEmotion] = useState<Emotion>();
  const { showToast } = useToastStore();
  const { data: session } = useSession();

  const handleLoad = async () => {
    try {
      const response = await fetchWithoutToken('GET', `/emotionLogs/today/?userId=${session.id}`);

      if (response.ok) {
        if (response.status === 200) {
          const data: GetEmotionLog = await response.json();
          setActiveEmotion(data.emotion);
        } else {
          return;
        }
      } else {
        const { message } = await response.json();
        showToast({ message, type: 'error' });
      }
    } catch (error) {
      console.error('감정 로드 중 예외 발생: ', error);

      showToast({ message: TOAST_MESSAGES.error, type: 'error' });
    }
  };

  const handleClick = async (emotion: Emotion) => {
    try {
      const response = await fetchWithToken('POST', '/emotionLogs/today', session, {
        emotion,
      });

      if (response.ok) {
        if (activeEmotion) {
          showToast({ message: TOAST_MESSAGES.emotion.updateSuccess, type: 'success' });
        } else {
          showToast({ message: TOAST_MESSAGES.emotion.createSuccess, type: 'success' });
        }
        const data: GetEmotionLog = await response.json();
        setActiveEmotion(data.emotion);
      } else {
        const { message } = await response.json();
        showToast({ message, type: 'error' });
      }
    } catch (error) {
      console.error('감정 선택 중 예외 발생: ', error);
      showToast({ message: TOAST_MESSAGES.error, type: 'error' });
    }
  };

  useEffect(() => {
    if (session) {
      handleLoad();
    }
  }, [session]);

  return (
    <ul className="mx-auto flex w-full max-w-[350px] justify-between sm:max-w-full sm:justify-center sm:gap-4">
      {EMOTIONS.map((emotion) => (
        <li key={emotion.english} className="flex flex-col items-center gap-2">
          <button
            onClick={() => handleClick(emotion.english)}
            disabled={emotion.english === activeEmotion}
            className={`flex size-14 items-center justify-center rounded-2xl duration-100 sm:size-24 ${emotion.english === activeEmotion ? 'border-4 border-var-illust-green bg-var-blue-100' : 'bg-[rgba(175,186,205,0.15)] hover:shadow-md'}`}
          >
            <EmotionImage type={emotion.english} size="xl" />
          </button>
          <p
            className={`text-xl font-semibold ${emotion.english === activeEmotion ? '' : 'text-[#999]'}`}
          >
            {emotion.korean}
          </p>
        </li>
      ))}
    </ul>
  );
}
