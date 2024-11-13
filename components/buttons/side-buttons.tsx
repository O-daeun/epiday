import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SideButton from './side-button';

export default function SideButtons() {
  const [isTopButtonVisible, setIsTopButtonVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const checkScrollTop = () => {
    if (!isTopButtonVisible && window.scrollY > 300) {
      setIsTopButtonVisible(true);
    } else if (isTopButtonVisible && window.scrollY <= 300) {
      setIsTopButtonVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [isTopButtonVisible]);

  return (
    <div
      className={`fixed right-6 flex flex-col items-end gap-2 duration-100 sm:right-10 ${isTopButtonVisible ? 'bottom-5 sm:bottom-10' : '-bottom-9 sm:-bottom-8'}`}
    >
      {pathname !== '/addepiday' && pathname !== '/' && (
        <SideButton onClick={() => router.push('/addepiday')}>
          <Image src="/plus-white.svg" width={24} height={24} alt="+" />
          <span className="text-var-blue-100">에피데이 만들기</span>
        </SideButton>
      )}
      <SideButton onClick={scrollToTop} isVisible={isTopButtonVisible}>
        <Image
          src="/arrow-top.svg"
          width={22}
          height={14}
          alt="맨 위로 스크롤"
          className="h-auto w-4 sm:w-[22px]"
        />
      </SideButton>
    </div>
  );
}
