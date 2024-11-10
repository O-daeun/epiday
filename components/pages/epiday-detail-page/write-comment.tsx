import ProfileImageSkeleton from '@/components/skeletons/profile-image-skeleton';
import { useSession } from 'next-auth/react';
import CommentForm from '../../forms/comment-form';
import ProfileImage from '../../profile-image';

interface Props {
  id: number;
}

export default function WriteComment({ id }: Props) {
  const { data: session } = useSession();

  return (
    <div className="mb-3 mt-4 flex gap-4 sm:mb-10 sm:mt-6 sm:gap-6">
      {session ? (
        <ProfileImage nickname={session.nickname} imageUrl={session.image} size="m" />
      ) : (
        <ProfileImageSkeleton size="m" />
      )}
      <CommentForm id={id} className="grow" />
    </div>
  );
}
