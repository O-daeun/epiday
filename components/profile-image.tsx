import Image from 'next/image';

const SIZES = {
  s: {
    circle: 24,
    text: 14,
  },
  m: {
    circle: 48,
    text: 24,
  },

  l: {
    circle: 120,
    text: 60,
  },
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
}

/**
 * @param size s = 24, m = 48, l = 120
 */
export default function ProfileImage({ nickname, imageUrl, size }: Props) {
  const style = {
    width: SIZES[size].circle,
    height: SIZES[size].circle,
    fontSize: SIZES[size].text,
  };

  const getColorForNickname = (nickname: string) => {
    const firstChar = nickname.charCodeAt(0);
    return COLORS[firstChar % COLORS.length];
  };

  if (!imageUrl) {
    return (
      <div
        className="flex items-center justify-center rounded-[50%] bg-var-gray-300 text-white shadow-md"
        style={{ ...style, backgroundColor: getColorForNickname(nickname) }}
      >
        {nickname.slice(0, 1)}
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      width={SIZES[size].circle}
      height={SIZES[size].circle}
      alt="프로필이미지"
      className="rounded-full object-cover shadow-md"
      style={style}
    />
  );
}
