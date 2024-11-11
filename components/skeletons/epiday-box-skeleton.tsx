import TextSkeleton from './text-skeleton';

interface Props {
  isContentLimit?: boolean;
}

export default function EpidayBoxSkeleton({ isContentLimit }: Props) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl bg-white px-6 pb-10 pt-6 shadow-custom sm:gap-5 sm:pb-14 sm:pt-8 ${isContentLimit ? 'h-[140px] sm:h-[260px]' : ''}`}
    >
      <TextSkeleton />
      <TextSkeleton width="w-4/5" />
    </div>
  );
}
