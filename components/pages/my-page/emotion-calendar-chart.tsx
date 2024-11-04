import { getMonthEmotionLogs } from '@/apis/emotion-log/get-month-emotion-logs';
import BoxSkeleton from '@/components/skeletons/box-skeleton';
import TextSkeleton from '@/components/skeletons/text-skeleton';
import { queryKeys } from '@/constants/query-keys';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import EmotionCalendar from './emotion-calendar';
import EmotionChart from './emotion-chart';
import Section from './section';
import Title from './title';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

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
      setYear(currentYear);
      setMonth(currentMonth);
    }
  }, [year, month]);

  if (!emotionLogs || isLoading)
    return (
      <>
        <Section>
          <Title>
            {currentYear}년 {currentMonth}월
          </Title>
          <BoxSkeleton height="h-[547px]" />
        </Section>
        <Section>
          <div className="flex items-center justify-between">
            <Title>감정 차트</Title>
            <TextSkeleton width="w-16" />
          </div>
          <BoxSkeleton height="h-[250px]" />
        </Section>
      </>
    );
  if (isError) return <div>Error loading emotion logs</div>; // note: 추후 error ui 구현

  return (
    <>
      <EmotionCalendar emotionLogs={emotionLogs} refetch={handleRefetch} />
      <EmotionChart formattedYearMonth={`${year}.${month}`} emotionLogs={emotionLogs} />
    </>
  );
}
