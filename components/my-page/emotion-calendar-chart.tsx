import { fetchWithoutToken } from '@/api/fetch-without-token';
import { useToastStore } from '@/store/use-toast-store';
import { GetEmotionLog } from '@/types/emotion-types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import EmotionCalendar from './emotion-calendar';
import EmotionChart from './emotion-chart';

export default function EmotionCalendarChart() {
  const [emotionLogs, setEmotionLogs] = useState<GetEmotionLog[]>();
  const [formattedYearMonth, setFormattedYearMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();
  const { data: session } = useSession();

  const updateFormattedYearMonth = (year: number, month: number) => {
    setFormattedYearMonth(`${year}년 ${month}월`);
  };

  const fetchEmotionLogs = async (year: number, month: number) => {
    if (isLoading || !session) return;

    setIsLoading(true);
    const response = await fetchWithoutToken(
      'GET',
      `/emotionLogs/monthly?userId=${session.id}&year=${year}&month=${month}`,
    );
    if (response.ok) {
      const data = await response.json();
      setEmotionLogs(data);
      updateFormattedYearMonth(year, month);
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    fetchEmotionLogs(currentYear, currentMonth);
  }, [session]);

  if (!emotionLogs) return;

  return (
    <>
      <EmotionCalendar emotionLogs={emotionLogs} fetchEmotionLogs={fetchEmotionLogs} />
      <EmotionChart formattedYearMonth={formattedYearMonth} emotionLogs={emotionLogs} />
    </>
  );
}
