import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LogoLink from '../logo-link';
import ProfileLink from '../profile-link';
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
    <HeaderLayout className="flex w-full items-center justify-between px-[120px] md:px-6">
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
      {session && <ProfileLink src={session.image} nickname={session.nickname} />}
    </HeaderLayout>
  );
}
