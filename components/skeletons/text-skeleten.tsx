interface Props {
  width?: string;
  color?: string;
}

export default function TextSkeleten({ width = 'w-full', color = 'bg-var-gray-100' }: Props) {
  return <div className={`h-4 rounded-sm ${width} ${color}`} />;
}
