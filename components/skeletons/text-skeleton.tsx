interface Props {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
}

export default function TextSkeleton({
  width = 'w-full',
  height = 'h-4',
  color = 'bg-var-gray-100/50',
  className = '',
}: Props) {
  return <div className={`rounded-sm ${width} ${height} ${color} ${className}`} />;
}
