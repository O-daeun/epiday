import EpidaysSection from '@/components/landing-page/epidays-section';
import IntroSection from '@/components/landing-page/intro-section';
import LastSection from '@/components/landing-page/last-section';
import MainSection from '@/components/landing-page/main-section';
import ZigzagLine from '@/components/zigzag-line';

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
