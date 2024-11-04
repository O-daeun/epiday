import InnerLayout from '../inner-layout';
import ProfileImageSkeleton from './profile-image-skeleton';
import TextSkeleton from './text-skeleton';

export default function CommentSkeleton() {
  return (
    <InnerLayout className="group relative flex gap-[13px] border-t border-var-line-200 py-[35px]">
      <ProfileImageSkeleton size="m" />
      <div className="grow">
        <TextSkeleton width="w-10" />
        <div className="mt-5 flex flex-col gap-2">
          <TextSkeleton />
          <TextSkeleton width="w-2/3" />
        </div>
      </div>
    </InnerLayout>
  );
}
