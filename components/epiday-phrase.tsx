const GAP_SIZE = {
  s: 5,
  m: 6,
  l: 8,
};

interface Props {
  content: string;
  author: string;
  gap?: 's' | 'm' | 'l';
  authorPosition?: 'left' | 'right';
  isContentLimit?: boolean;
  className?: string;
}

/**
 * epiday 문구와 저자
 * @param gap s:20px, m:24px, l:32px
 * @param authorPosition 저자 왼쪽 또는 오른쪽(default)
 * @param isContentLimit 말줄임표 여부(4줄이상)
 */
export default function EpidayPhrase({
  content,
  author,
  gap = 'm',
  authorPosition = 'right',
  isContentLimit,
  className = '',
}: Props) {
  const authorName = author.startsWith('본인:') ? author.slice(3) : author;
  const authorPositionStyle = authorPosition === 'right' ? 'text-right' : '';
  const gapStyle = `gap-${GAP_SIZE[gap]}`;

  return (
    <div className={`flex w-full flex-col ${gapStyle} ${className}`}>
      <q
        className={`break-all font-iropke text-2xl leading-normal ${isContentLimit ? 'line-clamp-4' : ''}`}
        style={{ quotes: 'none' }}
      >
        {content}
      </q>
      <cite className={`font-iropke text-2xl not-italic text-var-blue-400 ${authorPositionStyle}`}>
        - {authorName} -
      </cite>
    </div>
  );
}
