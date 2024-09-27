import { useModalStore } from '@/store/use-modal-store';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { timeAgo } from '@/utils/timeAgo';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useState } from 'react';
import CommentButton from './buttons/comment-button';
import CommentForm from './forms/comment-form';
import InnerLayout from './inner-layout';
import DeleteModal from './modals/delete-modal';
import ProfileImage from './profile-image';

interface Props {
  comment: GetCommentData;
  onChangeComments: Dispatch<SetStateAction<GetCommentsData>>;
}

export default function Comment({ comment, onChangeComments }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const { data: session } = useSession();
  const { openModal } = useModalStore();

  return (
    <div className="mx-auto max-w-[640px] border-t border-var-line-200 py-[35px]">
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
            {!isEdit && comment.writer.id === session.id && (
              <div className="flex gap-4">
                <CommentButton color="black" onClick={() => setIsEdit(true)}>
                  수정
                </CommentButton>
                <CommentButton
                  color="red"
                  onClick={() =>
                    openModal(<DeleteModal id={comment.id} onChangeComments={onChangeComments} />)
                  }
                >
                  삭제
                </CommentButton>
              </div>
            )}
          </div>
          {isEdit ? (
            <CommentForm
              onChangeComments={onChangeComments}
              comment={comment}
              onEdit={setIsEdit}
              className="mt-4"
            />
          ) : (
            <p className="mt-4 w-full whitespace-pre-line break-all text-xl leading-8">
              {comment.content}
            </p>
          )}
        </div>
      </InnerLayout>
    </div>
  );
}
