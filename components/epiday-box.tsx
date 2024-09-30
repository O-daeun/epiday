import { EpidayItemData } from '@/types/epiday-types';
import EpidayPhrase from './epiday-phrase';
import TagList from './tag-list';

interface Props {
  epiday: EpidayItemData;
}

export default function EpidayBox({ epiday }: Props) {
  return (
    <div>
      <div className='flex h-[260px] rounded-2xl border border-var-line-100 bg-var-blue-100 bg-[url("/feed-line.svg")] bg-[length:auto_100%] bg-[0_-10px] p-6 shadow-[0px_3px_12px_0px_rgba(0,0,0,0.04)]'>
        <EpidayPhrase
          content={epiday.content}
          author={epiday.author}
          isContentLimit
          className="justify-between"
        />
      </div>
      <div className="mt-2 flex justify-end">
        <TagList tags={epiday.tags} className="font-iropke" />
      </div>
    </div>
  );
}
