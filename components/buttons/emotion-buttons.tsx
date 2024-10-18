import { getTodayEmotionLog } from '@/api/emotion-log/get-today-emotion-log';
import { postTodayEmotionLog } from '@/api/emotion-log/post-today-emotion-log';
import { EMOTIONS } from '@/constants/emotions';
import { queryKeys } from '@/constants/query-keys';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { Emotion, GetEmotionLog } from '@/types/emotion-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import EmotionImage from '../emotion-image';

export default function EmotionButtons() {
  const { showToast } = useToastStore();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: emotionLog } = useQuery<GetEmotionLog>({
    queryKey: session ? queryKeys.emotionLog.todayEmotionLog(session.id) : null,
    queryFn: () => getTodayEmotionLog(session.id),
    enabled: !!session,
  });

  const mutation = useMutation<GetEmotionLog, Error, Emotion>({
    mutationFn: (emotion) => postTodayEmotionLog(session, emotion),
    onSuccess: () => {
      showToast({
        message: emotionLog
          ? TOAST_MESSAGES.emotion.updateSuccess
          : TOAST_MESSAGES.emotion.createSuccess,
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.emotionLog.todayEmotionLog(session.id) });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'error' });
    },
  });

  const handleClick = (emotion: Emotion) => {
    mutation.mutate(emotion);
  };

  return (
    <ul className="mx-auto flex w-full max-w-[350px] justify-between sm:max-w-full sm:justify-center sm:gap-4">
      {EMOTIONS.map((emotion) => (
        <li key={emotion.english} className="flex flex-col items-center gap-2">
          <button
            onClick={() => handleClick(emotion.english)}
            disabled={emotion.english === emotionLog?.emotion}
            className={`flex size-14 items-center justify-center rounded-2xl duration-100 sm:size-24 ${emotion.english === emotionLog?.emotion ? 'border-4 border-var-illust-green bg-var-blue-100' : 'bg-[rgba(175,186,205,0.15)] hover:shadow-md'}`}
          >
            <EmotionImage type={emotion.english} size="xl" />
          </button>
          <p
            className={`text-xl font-semibold ${emotion.english === emotionLog?.emotion ? '' : 'text-[#999]'}`}
          >
            {emotion.korean}
          </p>
        </li>
      ))}
    </ul>
  );
}
