import Image from 'next/image';

interface Props {
  type: '에피데이' | '댓글';
}

export default function NoContents({ type }: Props) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-2 sm:min-h-[488px] sm:gap-6">
      <Image
        src="/no-data.svg"
        width={144}
        height={144}
        alt="데이터 없음"
        className="size-24 sm:size-36"
      />
      <p className="text-center text-sm leading-6 sm:text-xl sm:leading-8">
        아직 {type}
        {type === '에피데이' ? '가' : '이'} 없어요! <br />
        {type}
        {type === '에피데이' ? '를' : '을'} 달고 다른 사람들과 교류해보세요.
      </p>
    </div>
  );
}
