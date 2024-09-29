import { TagData } from '@/types/epiday-types';

interface Props {
  tags: TagData[] | null;
  className?: string;
}

export default function TagList({ tags, className }: Props) {
  return (
    <ul className="flex gap-4">
      {tags.map((tag) => (
        <li key={tag.id} className={`text-xl text-var-blue-400 ${className}`}>
          #{tag.name}
        </li>
      ))}
    </ul>
  );
}
