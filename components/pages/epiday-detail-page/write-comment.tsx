import { useSession } from 'next-auth/react';
import CommentForm from '../../forms/comment-form';
import ProfileImage from '../../profile-image';

interface Props {
  id: number;
}

export default function WriteComment({ id }: Props) {
  const { data: session } = useSession();

  if (!session) return null;
  return (
    <div className="mb-10 mt-6 flex gap-6">
      <ProfileImage nickname={session.nickname} imageUrl={session.image} size="m" />
      <CommentForm id={id} className="grow" />
    </div>
  );
}
