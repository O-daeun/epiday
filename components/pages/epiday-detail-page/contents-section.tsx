'use client';

import { getEpidayDetails } from '@/apis/epiday/get-epiday-details';
import BoxSkeleton from '@/components/skeletons/box-skeleton';
import TextSkeleton from '@/components/skeletons/text-skeleton';
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

  if (isLoading || !epiday)
    return (
      <section className="bg-[repeating-linear-gradient(white,white_24px,#F2F2F2_26px)] py-[42px] sm:bg-[repeating-linear-gradient(white,white_35px,#F2F2F2_37px)]">
        <InnerLayout>
          <div className="flex items-center gap-4">
            {[...Array(2)].map((_, index) => (
              <TextSkeleton key={index} width="w-10" height="h-5" />
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <TextSkeleton height="h-8" />
            <TextSkeleton width="w-3/4" height="h-8" />
          </div>
          <div className="mt-9 flex justify-center gap-[18px]">
            <BoxSkeleton width="w-16 sm:w-20" height="h-9 sm:h-12" />
            <BoxSkeleton width="w-24 sm:w-28" height="h-9 sm:h-12" />
          </div>
        </InnerLayout>
      </section>
    );
  if (isError) return <div>에피데이를 불러올 수 없습니다.</div>;

  return (
    <section className="bg-[repeating-linear-gradient(white,white_24px,#F2F2F2_26px)] py-[42px] sm:bg-[repeating-linear-gradient(white,white_35px,#F2F2F2_37px)]">
      <InnerLayout>
        <div className="flex items-center justify-between">
          <TagList tags={epiday.tags} />
          {session && epiday.writerId === session.id && <KebabButton id={id} />}
        </div>
        <EpidayPhrase
          content={epiday.content}
          author={epiday.author}
          isDetailPage
          className="mt-4 sm:mt-8"
        />
        <div className="mt-8 flex justify-center gap-4 sm:mt-9 sm:gap-[18px]">
          <LikeButton id={id} likeCount={epiday.likeCount} isLiked={epiday.isLiked} />
          <ShareButton />
        </div>
        {epiday.referenceTitle && (
          <div className="mt-5 flex justify-end gap-1 text-sm sm:text-base">
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
