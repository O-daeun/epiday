interface Props {
  width?: string;
  height: string;
  className?: string;
}

export default function BoxSkeleton({ width = 'w-full', height, className = '' }: Props) {
  return <div className={`rounded-sm bg-var-gray-100/50 ${width} ${height} ${className}`} />;
}
