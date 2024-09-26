import EpidayDetailComments from '@/components/epiday-detail-comments';
import EpidayDetailContents from '@/components/epiday-detail-contents';
import Image from 'next/image';

interface Props {
  params: { id: number };
}

export default function DetailPage({ params: { id } }: Props) {
  return (
    <div className="bg-var-background">
      <EpidayDetailContents id={id} />
      <div className="w-full overflow-x-hidden">
        <Image
          src="/detail-line.png"
          width={2640}
          height={54}
          className="-ml-5 -mt-6 w-[2640px] max-w-[2640px]"
          alt=""
        />
      </div>
      <EpidayDetailComments id={id} />
    </div>
  );
}
