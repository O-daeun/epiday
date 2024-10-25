import EpidaysSection from '@/components/pages/landing-page/epidays-section';
import IntroSection from '@/components/pages/landing-page/intro-section';
import LastSection from '@/components/pages/landing-page/last-section';
import MainSection from '@/components/pages/landing-page/main-section';
import ZigzagLine from '@/components/zigzag-line';

export const revalidate = 60 * 5; // 5분마다 데이터 재검증

export default function LandingPage() {
  return (
    <>
      <MainSection />
      <ZigzagLine />
      <IntroSection />
      <EpidaysSection />
      <ZigzagLine isInvert />
      <LastSection />
    </>
  );
}
