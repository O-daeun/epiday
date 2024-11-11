'use client';

import InnerLayout from '@/components/inner-layout';
import EmotionCalendarChart from '@/components/pages/my-page/emotion-calendar-chart';
import MyWriting from '@/components/pages/my-page/my-writing';
import Profile from '@/components/pages/my-page/profile';
import TodayEmotion from '@/components/pages/my-page/today-emotion';

export default function MyPage() {
  return (
    <div className="bg-var-background pt-[116px] sm:pt-[208px]">
      <div className="relative rounded-3xl bg-var-blue-100 shadow-big">
        <InnerLayout>
          <Profile />
          <div className="flex flex-col gap-14 pb-[88px] sm:gap-[165px]">
            <TodayEmotion />
            <EmotionCalendarChart />
          </div>
        </InnerLayout>
      </div>
      <MyWriting />
    </div>
  );
}
