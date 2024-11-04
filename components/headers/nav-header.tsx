import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LogoLink from '../logo-link';
import ProfileLink from '../profile-link';
import ProfileImageSkeleton from '../skeletons/profile-image-skeleton';
import TextSkeleton from '../skeletons/text-skeleton';
import HeaderLayout from './header-layout';

const NAV_LIST = [
  {
    title: '피드',
    link: '/feed',
  },
  {
    title: '검색',
    link: '/search',
  },
];

export default function NavHeader() {
  const { data: session } = useSession();

  return (
    <HeaderLayout>
      <div className="mx-auto flex w-full max-w-[1248px] items-center justify-between px-6">
        <div className="flex items-center gap-9">
          <LogoLink />
          <nav className="flex gap-6">
            {NAV_LIST.map((nav) => (
              <Link href={nav.link} key={nav.title}>
                {nav.title}
              </Link>
            ))}
          </nav>
        </div>
        {session ? (
          <ProfileLink src={session.image} nickname={session.nickname} />
        ) : (
          <div className="flex items-center gap-[6px]">
            <ProfileImageSkeleton size="s" />
            <TextSkeleton width="w-10" />
          </div>
        )}
      </div>
    </HeaderLayout>
  );
}
