import Image from 'next/image';

interface Props {
  nickname: string;
  imageUrl: string | null;
  size?: number;
}

export default function ProfileImage({ nickname, imageUrl, size = 48 }: Props) {
  const circleSize = `size-[${size}px]`;

  if (!imageUrl) {
    return (
      <div
        className={`flex items-center justify-center rounded-[50%] bg-var-gray-300 text-sm text-white shadow-md ${circleSize}`}
      >
        {nickname.slice(0, 1)}
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      width={size}
      height={size}
      alt="프로필이미지"
      className={`rounded-full object-cover shadow-md ${circleSize}`}
    />
  );
}
