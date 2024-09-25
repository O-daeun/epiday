import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useToastStore } from '@/store/use-toast-store';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToastStore();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      showToast({ message: TOAST_MESSAGES.auth.afterLogin, type: 'error' });
    }
  }, [status, router]);

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
