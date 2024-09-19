import Link from 'next/link';
import ProfileImage from './profile-image';

interface Props {
  src: string;
  nickname: string;
}

export default function ProfileLink({ src, nickname }: Props) {
  return (
    <Link href="/mypage" className="flex items-center gap-[6px]">
      <ProfileImage nickname={nickname} imageUrl={src} size="s" />
      <span className="text-sm font-medium text-var-gray-300">{nickname}</span>
    </Link>
  );
}
