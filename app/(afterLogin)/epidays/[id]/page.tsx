import EpidayDetailComments from '@/components/epiday-detail/epiday-detail-comments';
import EpidayDetailContents from '@/components/epiday-detail/epiday-detail-contents';
import EpidayDetailLine from '@/components/epiday-detail/epiday-detail-line';

interface Props {
  params: { id: number };
}

export default function DetailPage({ params: { id } }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col bg-var-background pb-32">
      <EpidayDetailContents id={id} />
      <EpidayDetailLine />
      <EpidayDetailComments id={id} />
    </div>
  );
}
