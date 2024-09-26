import { GetCommentData } from '@/types/comment-types';
import { timeAgo } from '@/utils/timeAgo';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import CommentButton from './buttons/comment-button';
import InnerLayout from './inner-layout';
import ProfileImage from './profile-image';

interface Props {
  comment: GetCommentData;
}

export default function Comment({ comment }: Props) {
  const { data: session } = useSession();

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div className="border-t border-var-line-200 py-[35px]">
      <InnerLayout className="flex gap-[13px]">
        <ProfileImage nickname={comment.writer.nickname} imageUrl={comment.writer.image} size="m" />
        <div className="grow">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 leading-6">
              <span className="text-var-black-300">{comment.writer.nickname}</span>
              <span className="text-var-black-300">{timeAgo(comment.createdAt)}</span>
              {comment.isPrivate && (
                <span className="flex items-center gap-[2px] text-sm text-var-gray-300">
                  <LockClosedIcon className="size-[14px] stroke-var-gray-300 stroke-2" /> 비밀댓글
                </span>
              )}
            </div>
            {comment.writer.id === session.id && (
              <div className="flex gap-4">
                <CommentButton color="black" onClick={handleEdit}>
                  수정
                </CommentButton>
                <CommentButton color="red" onClick={handleDelete}>
                  삭제
                </CommentButton>
              </div>
            )}
          </div>
          <p className="mt-4 text-xl leading-8">{comment.content}</p>
        </div>
      </InnerLayout>
    </div>
  );
}
