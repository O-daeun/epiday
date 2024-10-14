import { Emotion } from '@/types/emotion-types';
import Image from 'next/image';

const IMAGE_SIZE = {
  s: 'size-6',
  m: 'size-[30px]',
  l: 'size-9',
  xl: 'size-8 sm:size-12',
};

interface Props {
  type: Emotion;
  size: 's' | 'm' | 'l' | 'xl';
  className?: string;
}

/**
 * @param type 'moved' | 'happy' | 'worried' | 'sad' | 'angry'
 * @param size 's' = 24px | 'm' = 30px | 'l' = 36px | 'xl' = 48px
 */
export default function EmotionImage({ type, size, className = '' }: Props) {
  return (
    <Image
      src={`/${type.toLowerCase()}.svg`}
      width={48}
      height={48}
      alt={type}
      // style={{ width: IMAGE_SIZE[size], height: IMAGE_SIZE[size] }}
      className={`${IMAGE_SIZE[size]} ${className}`}
    />
  );
}
