import Image from 'next/image';

const SIZES = {
  s: 24,
  m: 48,
  l: 120,
};

interface Props {
  nickname: string;
  imageUrl: string | null;
  size?: 's' | 'm' | 'l';
}

export default function ProfileImage({ nickname, imageUrl, size = 'm' }: Props) {
  const circleSize = { width: SIZES[size], height: SIZES[size] };
  if (!imageUrl) {
    return (
      <div
        className="flex items-center justify-center rounded-[50%] bg-var-gray-300 text-sm text-white shadow-md"
        style={circleSize}
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
      className="rounded-full object-cover shadow-md"
      style={circleSize}
    />
  );
}
