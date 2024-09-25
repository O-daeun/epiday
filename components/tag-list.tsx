import { GetTagData } from '@/types/epiday-types';

interface Props {
  tags: GetTagData[] | null;
}

export default function TagList({ tags }: Props) {
  return (
    <ul className="flex gap-4">
      {tags.map((tag) => (
        <li key={tag.id} className="text-xl text-var-blue-400">
          #{tag.name}
        </li>
      ))}
    </ul>
  );
}
