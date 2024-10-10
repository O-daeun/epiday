'use client';

import InnerLayout from '@/components/inner-layout';
import EmotionCalendarChart from '@/components/my-page/emotion-calendar-chart';
import Profile from '@/components/my-page/profile';
import TodayEmotion from '@/components/my-page/today-emotion';

export default function MyPage() {
  return (
    <div className="bg-var-background pt-32">
      <div className="shadow-big rounded-3xl bg-var-blue-100">
        <InnerLayout>
          <Profile />
          <div className="flex flex-col gap-[165px]">
            <TodayEmotion />
            <EmotionCalendarChart />
          </div>
        </InnerLayout>
      </div>
    </div>
  );
}
