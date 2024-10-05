import { fetchWithToken } from '@/api/fetch-with-token';
import { fetchWithoutToken } from '@/api/fetch-without-token';
import { EMOTIONS } from '@/constants/emotions';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { Emotion, GetTodayEmotionLog } from '@/types/emotion-types';
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
        const data: GetTodayEmotionLog = await response.json();
        setActiveEmotion(data.emotion);
      } else {
        const { message } = await response.json();
        showToast({ message, type: 'error' });
      }
    } catch (error) {
      console.error('작성완료 중 예외 발생: ', error);
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
        const data: GetTodayEmotionLog = await response.json();
        setActiveEmotion(data.emotion);
      } else {
        const { message } = await response.json();
        showToast({ message, type: 'error' });
      }
    } catch (error) {
      console.error('작성완료 중 예외 발생: ', error);
      showToast({ message: TOAST_MESSAGES.error, type: 'error' });
    }
  };

  useEffect(() => {
    if (session) {
      handleLoad();
    }
  }, [session]);

  return (
    <ul className="flex justify-center gap-4">
      {EMOTIONS.map((emotion) => (
        <li key={emotion.title} className="flex flex-col items-center gap-2">
          <button
            onClick={() => handleClick(emotion.title)}
            disabled={emotion.title === activeEmotion}
            className={`flex size-24 items-center justify-center rounded-2xl duration-100 ${emotion.title === activeEmotion ? 'border-4 border-var-illust-green bg-var-blue-100' : 'bg-[rgba(175,186,205,0.15)] hover:shadow-md'}`}
          >
            <EmotionImage type={emotion.title} size="xl" />
          </button>
          <p
            className={`text-xl font-semibold ${emotion.title === activeEmotion ? '' : 'text-[#999]'}`}
          >
            {emotion.text}
          </p>
        </li>
      ))}
    </ul>
  );
}
