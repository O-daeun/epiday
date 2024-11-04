import TextSkeleten from './text-skeleten';

interface Props {
  isContentLimit?: boolean;
}

export default function EpidayBoxSkeleton({ isContentLimit }: Props) {
  return (
    <div
      className={`flex flex-col gap-5 rounded-2xl bg-white px-6 pb-14 pt-8 shadow-custom ${isContentLimit ? 'h-[260px]' : ''}`}
    >
      <TextSkeleten />
      <TextSkeleten width="w-4/5" />
    </div>
  );
}
