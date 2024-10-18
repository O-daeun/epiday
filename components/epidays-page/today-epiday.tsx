import { getTodayEpiday } from '@/api/epiday/get-today-epiday';
import { queryKeys } from '@/constants/query-keys';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidayData } from '@/types/epiday-types';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import EpidayBox from '../epiday-box';
import Section from './section';

export default function TodayEpiday() {
  const { showToast } = useToastStore();

  const {
    data: epiday,
    isLoading,
    isError,
    error,
  } = useQuery<GetEpidayData>({
    queryKey: queryKeys.epiday.todayEpiday,
    queryFn: getTodayEpiday,
  });

  if (isError && error instanceof Error) {
    showToast({ message: error.message, type: 'error' });
  }

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오늘의 에피데이를 불러올 수 없습니다.</div>;
  if (!epiday) return null;

  return (
    <Section title="오늘의 에피데이">
      <Link href={`/epidays/${epiday.id}`}>
        <EpidayBox epiday={epiday} />
      </Link>
    </Section>
  );
}
