import TextSkeleten from './text-skeleten';

export default function EpidayBoxSkeleton() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white px-6 pb-16 pt-8 shadow-custom">
      <TextSkeleten />
      <TextSkeleten width="w-4/5" />
    </div>
  );
}
