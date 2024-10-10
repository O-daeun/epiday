import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { fetchWithoutToken } from '@/api/fetch-without-token';
import { useToastStore } from '@/store/use-toast-store';
import '@/styles/calendar.css';
import { GetEmotionLog } from '@/types/emotion-types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import EmotionImage from '../emotion-image';

const getTheDateEmotionLog = (date: Date, emotionLogs: GetEmotionLog[]) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const filteredLog: GetEmotionLog | null = emotionLogs.filter((emotionLog) => {
    const logMonth = Number(emotionLog.createdAt.slice(5, 7));
    const logDay = Number(emotionLog.createdAt.slice(8, 10));
    return month === logMonth && day === logDay;
  })[0];

  return filteredLog;
};

export default function EmotionCalendar() {
  const [emotionLogs, setEmotionLogs] = useState<GetEmotionLog[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();
  const { data: session } = useSession();

  const fetchEmotionLogs = async () => {
    if (isLoading || !session) return;

    setIsLoading(true);
    const response = await fetchWithoutToken(
      'GET',
      `/emotionLogs/monthly?userId=${session.id}&year=${2024}&month=${10}`,
    );
    if (response.ok) {
      const data = await response.json();
      setEmotionLogs(data);
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEmotionLogs();
  }, [session]);

  if (!emotionLogs) return;

  return (
    <section>
      <Calendar
        locale="ko-KR"
        calendarType="gregory"
        tileDisabled={({ view }) => {
          return view === 'month' ? true : false;
        }}
        tileContent={({ date, view }) => {
          const filteredLog = getTheDateEmotionLog(date, emotionLogs);
          if (view !== 'month') return null;
          return filteredLog ? (
            <>
              <span className="date">{date.getDate()}</span>
              <EmotionImage type={filteredLog.emotion} size="l" />
            </>
          ) : (
            <span className="date text-2xl">{date.getDate()}</span>
          );
        }}
      />
    </section>
  );
}
