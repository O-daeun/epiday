import { useSession } from 'next-auth/react';
import ProfileImage from '../profile-image';

export default function Profile() {
  const { data: session } = useSession();

  const handleLogout = () => {};

  if (!session) return;
  return (
    <div className="mx-auto w-fit translate-y-[-60px] transform">
      <ProfileImage nickname={session.nickname} imageUrl={session.image} size="l" />
      <h1 className="mt-4 text-center text-2xl font-medium text-var-black-950">
        {session.nickname}
      </h1>
      <button
        onClick={handleLogout}
        className="mx-auto mt-6 block rounded-full bg-var-line-100 px-[15px] py-[6px] text-xl font-medium text-var-gray-300"
      >
        로그아웃
      </button>
    </div>
  );
}
