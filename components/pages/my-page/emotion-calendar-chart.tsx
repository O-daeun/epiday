import { getMonthEmotionLogs } from '@/apis/emotion-log/get-month-emotion-logs';
import { queryKeys } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import EmotionCalendar from './emotion-calendar';
import EmotionChart from './emotion-chart';

export default function EmotionCalendarChart() {
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const { data: session } = useSession();

  const {
    data: emotionLogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.emotionLog.emotionLogsForMonth,
    queryFn: () => getMonthEmotionLogs(session.id, year, month),
    enabled: !!session && year !== null && month !== null,
  });

  const handleRefetch = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  useEffect(() => {
    if (!year && !month) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      setYear(currentYear);
      setMonth(currentMonth);
    }
  }, [year, month]);

  if (isLoading) return <div>Loading...</div>; // note: 추후 로딩 ui 구현
  if (isError) return <div>Error loading emotion logs</div>; // note: 추후 error ui 구현
  if (!emotionLogs) return;

  return (
    <>
      <EmotionCalendar emotionLogs={emotionLogs} refetch={handleRefetch} />
      <EmotionChart formattedYearMonth={`${year}.${month}`} emotionLogs={emotionLogs} />
    </>
  );
}
