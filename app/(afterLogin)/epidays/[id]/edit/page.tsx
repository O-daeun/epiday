'use client';

import EpidayForm from '@/components/forms/epiday-form';
import { baseUrl } from '@/constants/api-constants';
import { useToastStore } from '@/store/use-toast-store';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Props {
  params: { id: number };
}

export default function EditPage({ params: { id } }: Props) {
  const [epidayData, setEpidayData] = useState();

  const { showToast } = useToastStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (id && session) {
      const handleLoadData = async () => {
        const response = await fetch(`${baseUrl}/epigrams/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

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
