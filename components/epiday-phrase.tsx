const GAP_SIZE = {
  s: 20,
  m: 24,
  l: 32,
};

interface Props {
  content: string;
  author: string;
  gap?: 's' | 'm' | 'l';
  authorPosition?: 'left' | 'right';
  className?: string;
}

export default function EpidayPhrase({
  content,
  author,
  gap = 'm',
  authorPosition = 'right',
  className = '',
}: Props) {
  const authorName = author.startsWith('본인:') ? author.slice(3) : author;
  const authorPositionStyle = authorPosition === 'right' ? 'text-right' : '';

  return (
    <div className={`flex flex-col gap-8 ${GAP_SIZE[gap]} ${className}`}>
      <q className="font-iropke text-2xl leading-normal" style={{ quotes: 'none' }}>
        {content}
      </q>
      <cite
        className={`text-right font-iropke text-2xl not-italic text-var-blue-400 ${authorPositionStyle}`}
      >
        - {authorName} -
      </cite>
    </div>
  );
}
