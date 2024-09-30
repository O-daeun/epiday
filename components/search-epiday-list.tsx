import Link from 'next/link';
import EpidayPhrase from './epiday-phrase';
import TagList from './tag-list';

export default function SearchEpidayList() {
  return (
    <ul className="mt-10">
      <li className="border-b border-var-gray-100">
        <Link href="" className="block p-6">
          <EpidayPhrase content="d" author="dd" gap="m" authorPosition="left" />
          <div className="mt-4 flex justify-end">
            <TagList tags={[{ id: 2, name: 'dddd' }]} />
          </div>
        </Link>
      </li>
    </ul>
  );
}
