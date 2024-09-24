'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import EpidayForm from '@/components/forms/epiday-form';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidayData } from '@/types/epiday-types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Props {
  params: { id: number };
}

export default function EditPage({ params: { id } }: Props) {
  const [epidayData, setEpidayData] = useState<GetEpidayData>();

  const { showToast } = useToastStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (id && session) {
      const handleLoadData = async () => {
        const response = await fetchWithToken('GET', `/epigrams/${id}`, session);

        if (response.ok) {
          const data = await response.json();
          setEpidayData(data);
        } else {
          const { message } = await response.json();
          showToast({ message, type: 'error' });
        }
      };
      handleLoadData();
    }
  }, [id, session]);

  return (
    <div>
      <EpidayForm data={epidayData} id={id} />
    </div>
  );
}
