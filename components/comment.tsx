import { useModalStore } from '@/store/use-modal-store';
import { GetCommentData } from '@/types/comment-types';
import { timeAgo } from '@/utils/time-ago';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CommentButton from './buttons/comment-button';
import CommentForm from './forms/comment-form';
import InnerLayout from './inner-layout';
import DeleteModal from './modals/delete-modal';
import ProfileImage from './profile-image';

interface Props {
  comment: GetCommentData;
  isShowPage?: boolean;
}

export default function Comment({ comment, isShowPage }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const { data: session } = useSession();
  const { openModal } = useModalStore();

  return (
    <InnerLayout className="group relative flex gap-[13px] border-t border-var-line-200 py-4 sm:py-[35px]">
      <ProfileImage nickname={comment.writer.nickname} imageUrl={comment.writer.image} size="m" />
      <div className="grow">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-base sm:leading-6">
            <span className="text-var-black-300">{comment.writer.nickname}</span>
            <span className="text-var-black-300">{timeAgo(comment.createdAt)}</span>
            {comment.isPrivate && (
              <span className="flex items-center gap-[2px] text-sm text-var-gray-300">
                <LockClosedIcon className="size-[14px] stroke-var-gray-300 stroke-2" /> 비밀댓글
              </span>
            )}
          </div>
          {!isEdit && comment.writer.id === session?.id && (
            <div className="flex gap-4">
              <CommentButton color="black" onClick={() => setIsEdit(true)}>
                수정
              </CommentButton>
              <CommentButton
                color="red"
                onClick={() => openModal(<DeleteModal id={comment.id} type="comment" />)}
              >
                삭제
              </CommentButton>
            </div>
          )}
        </div>
        {isEdit ? (
          <CommentForm comment={comment} onEdit={setIsEdit} className="mt-2 sm:mt-4" />
        ) : (
          <p className="mt-2 w-full whitespace-pre-line break-all text-sm leading-6 sm:mt-4 sm:text-xl sm:leading-8">
            {comment.content}
          </p>
        )}
      </div>
      {isShowPage && (
        <Link
          href={`/epidays/${comment.epigramId}`}
          className="absolute bottom-1 right-5 hidden items-center group-hover:flex"
        >
          <span className="text-xs text-var-blue-400 sm:text-base">해당 게시물로 이동</span>
          <Image
            src="/arrow-down.svg"
            width={24}
            height={24}
            alt=""
            className="size-4 -rotate-90 sm:size-6"
          />
        </Link>
      )}
    </InnerLayout>
  );
}
