import Image from 'next/image';

interface Props {
  type: '에피데이' | '댓글';
}

export default function NoContents({ type }: Props) {
  return (
    <div className="flex min-h-[488px] flex-col items-center justify-center gap-6">
      <Image src="/no-data.svg" width={144} height={144} alt="데이터 없음" />
      <p className="text-center text-xl leading-8">
        아직 {type}이(가) 없어요! <br />
        {type}을(를) 달고 다른 사람들과 교류해보세요.
      </p>
    </div>
  );
}
