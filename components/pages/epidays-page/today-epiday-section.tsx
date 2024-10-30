import { getTodayEpiday } from '@/apis/epiday/get-today-epiday';
import { queryKeys } from '@/constants/query-keys';
import { GetEpidayData } from '@/types/epiday-types';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Link from 'next/link';
import EpidayBox from '../../epiday-box';
import Title from '../my-page/title';
import Section from './section';

const todayDate = format(new Date(), 'yyyy-MM-dd');

export default function TodayEpidaySection() {
  const {
    data: epiday,
    isLoading,
    isError,
  } = useQuery<GetEpidayData>({
    queryKey: queryKeys.epiday.epidayForToday(todayDate),
    queryFn: getTodayEpiday,
  });

  if (isLoading) return <div>로딩 중...</div>; // note: 추후 로딩 구현
  if (isError) return <div>오늘의 에피데이를 불러올 수 없습니다.</div>; // note: 추후 에러 구현
  if (!epiday) return null; // 오늘의 에피데이가 없으면 아무것도 보여주지 않기

  return (
    <Section>
      <Title>오늘의 에피데이</Title>
      <Link href={`/epidays/${epiday.id}`}>
        <EpidayBox epiday={epiday} />
      </Link>
    </Section>
  );
}
