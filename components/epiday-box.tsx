import { EpidayItemData } from '@/types/epiday-types';
import EpidayPhrase from './epiday-phrase';
import TagList from './tag-list';

interface Props {
  epiday: EpidayItemData;
  isContentLimit?: boolean;
}

export default function EpidayBox({ epiday, isContentLimit = false }: Props) {
  return (
    <>
      <div
        className={`flex rounded-2xl border border-var-line-100 bg-var-blue-100 bg-[repeating-linear-gradient(white,white_25px,#F2F2F2_27px)] p-6 shadow-custom duration-100 hover:shadow-hover ${isContentLimit ? 'h-[260px]' : ''}`}
      >
        <EpidayPhrase
          content={epiday.content}
          author={epiday.author}
          isContentLimit={isContentLimit}
          className="justify-between"
        />
      </div>
      {epiday.tags.length > 0 && (
        <div className="mt-2 flex justify-end">
          <TagList tags={epiday.tags} className="font-iropke" />
        </div>
      )}
    </>
  );
}
