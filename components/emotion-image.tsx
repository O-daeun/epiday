import { Emotion } from '@/types/emotion-types';
import Image from 'next/image';

const IMAGE_SIZE = {
  s: 24,
  m: 30,
  l: 36,
  xl: 48,
};

interface Props {
  type: Emotion;
  size: 's' | 'm' | 'l' | 'xl';
}

/**
 * @param type 'moved' | 'happy' | 'worried' | 'sad' | 'angry'
 * @param size 's' = 24px | 'm' = 30px | 'l' = 36px | 'xl' = 48px
 */
export default function EmotionImage({ type, size }: Props) {
  return (
    <Image
      src={`/${type.toLowerCase()}.svg`}
      width={IMAGE_SIZE[size]}
      height={IMAGE_SIZE[size]}
      alt={type}
      style={{ width: IMAGE_SIZE[size], height: IMAGE_SIZE[size] }}
    />
  );
}
