import { GetCommentsData } from '@/types/comment-types';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';
import CommentForm from '../../forms/comment-form';
import ProfileImage from '../../profile-image';

interface Props {
  id: number;
  onChangeComments: Dispatch<SetStateAction<GetCommentsData>>;
}

export default function WriteComment({ id, onChangeComments }: Props) {
  const { data: session } = useSession();

  if (!session) return null;
  return (
    <div className="mb-10 mt-6 flex gap-6">
      <ProfileImage nickname={session.nickname} imageUrl={session.image} size="m" />
      <CommentForm id={id} onChangeComments={onChangeComments} className="grow" />
    </div>
  );
}
