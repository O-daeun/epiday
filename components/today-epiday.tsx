import { fetchWithoutToken } from '@/api/fetch-without-token';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidayData } from '@/types/epiday-types';
import { useEffect, useState } from 'react';
import EpidayBox from './epiday-box';
import MainSection from './main-section';

export default function TodayEpiday() {
  const [epiday, setEpiday] = useState<GetEpidayData>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const fetchEpiday = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const response = await fetchWithoutToken('GET', '/epigrams/today');
    if (response.ok) {
      const data = await response.json();

      setEpiday(data);
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEpiday();
  }, []);

  if (!epiday) return;

  return (
    <MainSection title="오늘의 에피데이">
      <EpidayBox epiday={epiday} />
    </MainSection>
  );
}
