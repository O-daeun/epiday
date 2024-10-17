import Image from 'next/image';

interface Props {
  isInvert?: boolean;
}

export default function ZigzagLine({ isInvert }: Props) {
  return (
    <div className={`w-full overflow-x-hidden ${isInvert ? 'rotate-180' : ''}`}>
      <Image
        src="/detail-line.png"
        width={2640}
        height={54}
        className="-ml-5 -mt-6 w-[2640px] max-w-[2640px]"
        alt=""
      />
    </div>
  );
}
