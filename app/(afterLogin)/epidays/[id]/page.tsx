import CommentsSection from '@/components/pages/epiday-detail-page/comments-section';
import ContentsSection from '@/components/pages/epiday-detail-page/contents-section';
import ZigzagLine from '@/components/zigzag-line';

interface Props {
  params: { id: number };
}

export default function EpidayDetailPage({ params: { id } }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col bg-var-background pb-32">
      <ContentsSection id={id} />
      <ZigzagLine />
      <CommentsSection id={id} />
    </div>
  );
}
