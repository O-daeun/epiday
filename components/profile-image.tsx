import Image from 'next/image';

const SIZES = {
  s: 24,
  m: 48,
  l: 120,
};

const COLORS = [
  '#00ffff', // 하늘
  '#33FF57', // 초록
  '#3357FF', // 파랑
  '#ff0088', // 핑크
  '#FF8333', // 주황
  '#00f2e6', // 청록
  '#8800ff', // 보라
  '#ff2036', // 빨강
  '#FF33D4', // 자주
  '#0bffb2', // 민트
];

interface Props {
  nickname: string;
  imageUrl: string | null;
  size: 's' | 'm' | 'l';
  priority?: boolean;
}

/**
 * @param size s = 24, m = 48, l = 120
 */
export default function ProfileImage({ nickname, imageUrl, size, priority }: Props) {
  const getColorForNickname = (nickname: string) => {
    const firstChar = nickname.charCodeAt(0);
    return COLORS[firstChar % COLORS.length];
  };

  if (!imageUrl) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-[50%] bg-var-gray-300 text-white shadow-md ${size === 'l' ? 'size-20 text-[30px] sm:size-[120px] sm:text-[60px]' : size === 'm' ? 'size-12 text-2xl' : 'size-6 text-[14px]'}`}
        style={{ backgroundColor: getColorForNickname(nickname) }}
      >
        {nickname.slice(0, 1)}
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      width={SIZES[size]}
      height={SIZES[size]}
      alt="프로필이미지"
      className={`shrink-0 rounded-full object-cover shadow-md ${size === 'l' ? 'size-20 sm:size-[120px]' : size === 'm' ? 'size-12' : 'size-6'}`}
      priority={priority}
    />
  );
}
