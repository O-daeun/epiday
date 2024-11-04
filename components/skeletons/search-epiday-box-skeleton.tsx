import TextSkeleton from './text-skeleton';

export default function SearchEpidayBoxSkeleton() {
  return (
    <li className="border-b border-var-gray-100 p-6">
      <div className="flex flex-col gap-2">
        <TextSkeleton height="h-6" />
        <TextSkeleton height="h-6" />
        <TextSkeleton width="w-2/3" height="h-6" />
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <TextSkeleton width="w-12" height="h-6" />
        <TextSkeleton width="w-12" height="h-6" />
      </div>
    </li>
  );
}
