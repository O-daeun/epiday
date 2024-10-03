import { TagData } from '@/types/epiday-types';
import HighlightKeyword from './highlight-keyword';

interface Props {
  tags: TagData[] | null;
  keyword?: string;
  className?: string;
}

export default function TagList({ tags, keyword, className }: Props) {
  return (
    <ul className="flex flex-wrap justify-end gap-4">
      {tags.map((tag) => (
        <li key={tag.id} className={`text-xl text-var-blue-400 ${className}`}>
          #{keyword ? <HighlightKeyword text={tag.name} keyword={keyword} /> : tag.name}
        </li>
      ))}
    </ul>
  );
}
