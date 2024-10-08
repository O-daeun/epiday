import { fetchWithoutToken } from '@/api/fetch-without-token';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidaysData } from '@/types/epiday-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SeeMoreButton from '../buttons/see-more-button';
import EpidayBox from '../epiday-box';
import Section from './section';

export default function RecentEpidays() {
  const [epidays, setEpidays] = useState<GetEpidaysData>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const fetchEpidays = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const cursorParams = epidays ? `&cursor=${epidays.nextCursor}` : '';
    const response = await fetchWithoutToken('GET', `/epigrams?limit=3${cursorParams}`);
    if (response.ok) {
      const data = await response.json();

      if (epidays) {
        setEpidays((prev) => ({
          ...data,
          list: [...prev.list, ...data.list],
        }));
      } else {
        setEpidays(data);
      }
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEpidays();
  }, []);
  return (
    <Section title="최신 에피데이">
      <ul className="flex flex-col gap-4">
        {epidays?.list.map((epiday) => (
          <li key={epiday.id}>
            <Link href={`/epidays/${epiday.id}`}>
              <EpidayBox epiday={epiday} />
            </Link>
          </li>
        ))}
        {(!epidays || epidays?.nextCursor) && (
          <SeeMoreButton onClick={fetchEpidays}>에피데이 더보기</SeeMoreButton>
        )}
      </ul>
    </Section>
  );
}
