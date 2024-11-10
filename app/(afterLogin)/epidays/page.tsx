'use client';

import InnerLayout from '@/components/inner-layout';
import RecentCommentsSection from '@/components/pages/epidays-page/recent-comments-section';
import RecentEpidays from '@/components/pages/epidays-page/recent-epidays-section';
import TodayEmotion from '@/components/pages/epidays-page/today-emotion-section';
import TodayEpiday from '@/components/pages/epidays-page/today-epiday-section';

export default function EpidaysPage() {
  return (
    <div className="bg-var-background pb-[150px] pt-[84px] sm:pt-[200px]">
      <InnerLayout className="flex flex-col gap-14 sm:gap-[140px]">
        <TodayEpiday />
        <TodayEmotion />
        <RecentEpidays />
      </InnerLayout>
      <RecentCommentsSection />
    </div>
  );
}
