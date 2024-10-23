import '@/styles/calendar.css';
import { GetEmotionLog } from '@/types/emotion-types';
import Calendar from 'react-calendar';
import EmotionImage from '../../emotion-image';

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

interface Props {
  emotionLogs: GetEmotionLog[];
  fetchEmotionLogs: (year: number, month: number) => void;
}

export default function EmotionCalendar({ fetchEmotionLogs, emotionLogs }: Props) {
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
        onActiveStartDateChange={({ activeStartDate }) => {
          const year = activeStartDate.getFullYear();
          const month = activeStartDate.getMonth() + 1;
          fetchEmotionLogs(year, month);
        }}
      />
    </section>
  );
}
