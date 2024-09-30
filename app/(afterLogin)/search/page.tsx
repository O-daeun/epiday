import SearchForm from '@/components/forms/search-form';
import InnerLayout from '@/components/inner-layout';
import RecentSearch from '@/components/recent-search';
import SearchEpidayList from '@/components/search-epiday-list';

export default function Page() {
  return (
    <div className="pt-12">
      <InnerLayout>
        <SearchForm />
        <RecentSearch />
      </InnerLayout>
      <SearchEpidayList />
    </div>
  );
}
