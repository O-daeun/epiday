'use client';

import { getEpidayDetails } from '@/api/epiday/get-epiday-details';
import { REFERENCE_URL_DEFAULT_VALUE } from '@/constants/api-constants';
import { queryKeys } from '@/constants/query-keys';
import { GetEpidayData } from '@/types/epiday-types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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
  const { data: session } = useSession();

  const {
    data: epiday,
    isLoading,
    isError,
  } = useQuery<GetEpidayData>({
    queryKey: queryKeys.epiday.epidayDetails(id),
    queryFn: () => getEpidayDetails(session, id),
    enabled: !!session,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에피데이를 불러올 수 없습니다.</div>;
  if (!epiday) return;

  return (
    <section className="bg-[repeating-linear-gradient(white,white_35px,#F2F2F2_37px)] py-[42px]">
      <InnerLayout>
        <div className="flex items-center justify-between">
          <TagList tags={epiday.tags} />
          {session && epiday.writerId === session.id && <KebabButton id={id} />}
        </div>
        <EpidayPhrase content={epiday.content} author={epiday.author} className="mt-8" />
        <div className="mt-9 flex justify-center gap-[18px]">
          <LikeButton id={id} likeCount={epiday.likeCount} isLiked={epiday.isLiked} />
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
