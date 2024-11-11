import { AUTHOR_VALUE } from '@/constants/api-constants';
import { ReactNode } from 'react';

const GAP_SIZE = {
  s: 5,
  m: 6,
  l: 8,
};

interface Props {
  content: string | ReactNode;
  author: string;
  gap?: 's' | 'm' | 'l';
  authorPosition?: 'left' | 'right';
  isContentLimit?: boolean;
  className?: string;
  isDetailPage?: boolean;
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
  isDetailPage,
}: Props) {
  const authorName = author.startsWith('본인:') ? author.slice(3) : author;
  const authorPositionStyle = authorPosition === 'right' ? 'text-right' : '';
  const gapStyle = `sm:gap-${GAP_SIZE[gap]}`;

  return (
    <div
      className={`flex w-full flex-col ${isDetailPage ? 'gap-4 sm:gap-6' : gapStyle} ${className}`}
    >
      <q
        className={`whitespace-pre-line break-all font-iropke leading-normal sm:leading-10 ${isDetailPage ? 'text-2xl' : 'text-sm sm:text-2xl'} ${!isContentLimit ? '' : author === AUTHOR_VALUE.unknown ? 'line-clamp-4 sm:line-clamp-5' : 'line-clamp-2 sm:line-clamp-4'}`}
        style={{ quotes: 'none' }}
      >
        {content}
      </q>
      {authorName !== AUTHOR_VALUE.unknown && (
        <cite
          className={`font-iropke not-italic leading-8 text-var-blue-400 sm:text-2xl ${isDetailPage ? 'text-base' : 'text-sm'} ${authorPositionStyle}`}
        >
          - {authorName} -
        </cite>
      )}
    </div>
  );
}
