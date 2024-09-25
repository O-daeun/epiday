'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidayData } from '@/types/epiday-types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import KebabButton from './buttons/kebab-button';
import LikeButton from './buttons/like-button';
import ShareButton from './buttons/share-button';
import EpidayPhrase from './epiday-phrase';
import InnerLayout from './inner-layout';
import TagList from './tag-list';

interface Props {
  id: number;
}

export default function EpidayDetailContents({ id }: Props) {
  const [epidayData, setEpidayData] = useState<GetEpidayData>();
  const { data: session } = useSession();
  const { showToast } = useToastStore();

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

  if (!epidayData) return <p>로딩중</p>; // note: 추후 로딩 구현

  return (
    <section>
      <InnerLayout>
        <div className="flex items-center justify-between">
          <TagList tags={epidayData.tags} />
          {epidayData.writerId === session.id && <KebabButton id={id} />}
        </div>
        <EpidayPhrase content={epidayData.content} author={epidayData.author} className="mt-8" />
        <div className="mt-9 flex justify-center gap-[18px]">
          <LikeButton id={id} number={epidayData.likeCount} />
          <ShareButton />
        </div>
      </InnerLayout>
    </section>
  );
}
