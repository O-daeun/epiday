import KeywordButton from './buttons/keyword-button';

const list = ['꿈', '#나아가야할때'];

export default function RecentSearch() {
  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">최근 검색어</h2>
        <button type="button" className="font-semibold text-var-error">
          모두 지우기
        </button>
      </div>
      <ul className="mt-10 flex flex-wrap gap-4">
        {list.map((keyword) => (
          <li key={keyword}>
            <KeywordButton text={keyword} />
          </li>
        ))}
      </ul>
    </div>
  );
}
