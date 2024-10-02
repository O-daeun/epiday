'use client';

import SearchForm from '@/components/forms/search-form';
import InnerLayout from '@/components/inner-layout';
import RecentSearch from '@/components/recent-search';
import SearchEpidayList from '@/components/search-epiday-list';

interface Props {
  searchParams: { keyword: string };
}

export default function Page({ searchParams: { keyword } }: Props) {
  return (
    <div className="pt-12">
      <InnerLayout>
        <SearchForm keyword={keyword} />
        <RecentSearch keyword={keyword} />
      </InnerLayout>
      {keyword && <SearchEpidayList keyword={keyword} />}
    </div>
  );
}
