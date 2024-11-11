'use client';

import InnerLayout from '@/components/inner-layout';
import RecentSearchedKewords from '@/components/pages/search-page/recent-searched-kewords';
import SearchForm from '@/components/pages/search-page/search-form';
import SearchedEpidayList from '@/components/pages/search-page/searched-epiday-list';

interface Props {
  searchParams: { keyword: string };
}

export default function Page({ searchParams: { keyword } }: Props) {
  return (
    <div className="pt-[60px] sm:pt-[104px]">
      <InnerLayout>
        <SearchForm keyword={keyword} />
        <RecentSearchedKewords keyword={keyword} />
      </InnerLayout>
      {keyword && <SearchedEpidayList keyword={keyword} />}
    </div>
  );
}
