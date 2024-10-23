'use client';

import { fetchWithToken } from '@/api/fetch-with-token';
import { REFERENCE_URL_DEFAULT_VALUE } from '@/constants/api-constants';
import { useToastStore } from '@/store/use-toast-store';
import { GetEpidayData } from '@/types/epiday-types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import EpidayPhrase from '../../epiday-phrase';
import InnerLayout from '../../inner-layout';
import TagList from '../../tag-list';
import KebabButton from './kebab-button';
import LikeButton from './like-button';
import ShareButton from './share-button';

interface Props {
  id: number;
}

export default function ContentsSection({ id }: Props) {
  const [epiday, setEpiday] = useState<GetEpidayData>();
  const { data: session } = useSession();
  const { showToast } = useToastStore();

  useEffect(() => {
    if (id && session) {
      const handleLoadData = async () => {
        const response = await fetchWithToken('GET', `/epigrams/${id}`, session);

        if (response.ok) {
          const data = await response.json();
          setEpiday(data);
        } else {
          const { message } = await response.json();
          showToast({ message, type: 'error' });
        }
      };
      handleLoadData();
    }
  }, [id, session]);

  if (!epiday) return <p>로딩중</p>; // note: 추후 로딩 구현

  return (
    <section className="bg-[repeating-linear-gradient(white,white_35px,#F2F2F2_37px)] py-[42px]">
      <InnerLayout>
        <div className="flex items-center justify-between">
          <TagList tags={epiday.tags} />
          {epiday.writerId === session.id && <KebabButton id={id} />}
        </div>
        <EpidayPhrase content={epiday.content} author={epiday.author} className="mt-8" />
        <div className="mt-9 flex justify-center gap-[18px]">
          <LikeButton id={id} number={epiday.likeCount} isInitialLiked={epiday.isLiked} />
          <ShareButton />
        </div>
        {epiday.referenceTitle && (
          <div className="mt-5 flex justify-end gap-1">
            <span className="shrink-0 font-iropke text-var-gray-300">출처:</span>
            <div>
              <span className="font-iropke text-var-gray-300">{epiday.referenceTitle}</span>
              <span className="italic text-var-gray-300">
                (
                {epiday.referenceUrl && epiday.referenceUrl !== REFERENCE_URL_DEFAULT_VALUE && (
                  <Link
                    href={epiday.referenceUrl}
                    className="break-all text-right font-iropke hover:underline"
                  >
                    {epiday.referenceUrl}
                  </Link>
                )}
                )
              </span>
            </div>
          </div>
        )}
      </InnerLayout>
    </section>
  );
}
