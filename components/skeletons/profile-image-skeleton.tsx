interface Props {
  size: 's' | 'm' | 'l';
}

export default function ProfileImageSkeleton({ size }: Props) {
  return (
    <div
      className={`shrink-0 rounded-[50%] bg-var-gray-300 shadow-md ${size === 'l' ? 'size-20 sm:size-[120px]' : size === 'm' ? 'size-12' : 'size-6'}`}
    />
  );
}
