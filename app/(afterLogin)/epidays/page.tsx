'use client';

import RecentComments from '@/components/epidays-page/recent-comments';
import RecentEpidays from '@/components/epidays-page/recent-epidays';
import TodayEmotion from '@/components/epidays-page/today-emotion';
import TodayEpiday from '@/components/epidays-page/today-epiday';
import InnerLayout from '@/components/inner-layout';

export default function EpidaysPage() {
  return (
    <div className="bg-var-background py-[120px]">
      <InnerLayout className="flex flex-col gap-[140px]">
        <TodayEpiday />
        <TodayEmotion />
        <RecentEpidays />
      </InnerLayout>
      <RecentComments />
    </div>
  );
}
