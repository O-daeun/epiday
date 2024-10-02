'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import { REFERENCE_URL_DEFAULT_VALUE } from '@/constants/api-constants';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidayData } from '@/types/epiday-types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import KebabButton from '../buttons/kebab-button';
import LikeButton from '../buttons/like-button';
import ShareButton from '../buttons/share-button';
import EpidayPhrase from '../epiday-phrase';
import InnerLayout from '../inner-layout';
import TagList from '../tag-list';

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
    <section className="bg-[repeating-linear-gradient(white,white_35px,#F2F2F2_37px)] py-[42px]">
      <InnerLayout>
        <div className="flex items-center justify-between">
          <TagList tags={epidayData.tags} />
          {epidayData.writerId === session.id && <KebabButton id={id} />}
        </div>
        <EpidayPhrase content={epidayData.content} author={epidayData.author} className="mt-8" />
        <div className="mt-9 flex justify-center gap-[18px]">
          <LikeButton id={id} number={epidayData.likeCount} isInitialLiked={epidayData.isLiked} />
          <ShareButton />
        </div>
        {epidayData.referenceUrl && epidayData.referenceUrl !== REFERENCE_URL_DEFAULT_VALUE && (
          <div className="mt-5 flex justify-end gap-1 font-iropke text-var-gray-300">
            출처:
            <Link href={epidayData.referenceUrl} className="font-iropke italic hover:underline">
              {epidayData.referenceTitle ? epidayData.referenceTitle : epidayData.referenceUrl}
            </Link>
          </div>
        )}
      </InnerLayout>
    </section>
  );
}
