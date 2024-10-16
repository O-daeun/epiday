import { fetchWithoutToken } from '@/api/fetch-without-token';
import { useToastStore } from '@/store/use-toast-store';
import { GetCommentData, GetCommentsData } from '@/types/comment-types';
import { GetEpidaysData } from '@/types/epiday-types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SeeMoreButton from '../buttons/see-more-button';
import Comment from '../comment';
import EpidayBox from '../epiday-box';
import InnerLayout from '../inner-layout';
import NoContents from '../no-contents';

type ActiveNav = 'epiday' | 'comment';

export default function MyWriting() {
  const [activeNav, setActiveNav] = useState<ActiveNav>('epiday');
  const [epidays, setEpidays] = useState<GetEpidaysData>();
  const [comments, setComments] = useState<GetCommentsData>();
  const [isLoadingEpidays, setIsLoadingEpidays] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { showToast } = useToastStore();
  const { data: session } = useSession();

  const navs: { id: ActiveNav; title: string; count: number }[] = [
    {
      id: 'epiday',
      title: '내 에피데이',
      count: epidays?.totalCount,
    },
    {
      id: 'comment',
      title: '내 댓글',
      count: comments?.totalCount,
    },
  ];

  const fetchEpidays = async () => {
    if (isLoadingEpidays || !session) return;

    setIsLoadingEpidays(true);
    const cursorParams = epidays ? `&cursor=${epidays.nextCursor}` : '';
    const response = await fetchWithoutToken(
      'GET',
      `/epigrams?limit=3&writerId=${session.id}${cursorParams}`,
    );
    if (response.ok) {
      const data = await response.json();

      if (epidays) {
        setEpidays((prev) => ({
          ...data,
          list: [...prev.list, ...data.list],
        }));
      } else {
        setEpidays(data);
      }
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoadingEpidays(false);
  };

  const fetchComments = async () => {
    if (isLoadingComments || !session) return;

    setIsLoadingEpidays(true);
    const cursorParams = comments ? `&cursor=${comments.nextCursor}` : '';
    const response = await fetchWithoutToken(
      'GET',
      `/users/${session.id}/comments?limit=4${cursorParams}`,
    );

    if (response.ok) {
      const data = await response.json();

      if (comments) {
        setComments((prev) => ({
          ...data,
          list: [...prev.list, ...data.list],
        }));
      } else {
        setComments(data);
      }
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
    setIsLoadingComments(false);
  };

  useEffect(() => {
    fetchEpidays();
    fetchComments();
  }, [session]);

  return (
    <section className="bg-var-background pb-[87px] pt-[96px]">
      <InnerLayout className="mb-12 flex gap-6">
        {navs.map((nav) => (
          <button
            key={nav.id}
            onClick={() => setActiveNav(nav.id)}
            className={`text-2xl font-semibold ${nav.id === activeNav ? '' : 'text-var-gray-300'}`}
          >
            {nav.title}({nav.count})
          </button>
        ))}
      </InnerLayout>
      {activeNav === 'epiday' && epidays && (
        <>
          {epidays.totalCount > 0 ? (
            <InnerLayout>
              <ul className="flex flex-col gap-12">
                {epidays?.list.map((epiday) => (
                  <li key={epiday.id}>
                    <Link href={`/epidays/${epiday.id}`}>
                      <EpidayBox epiday={epiday} />
                    </Link>
                  </li>
                ))}
              </ul>
              {(!epidays || epidays?.nextCursor) && (
                <SeeMoreButton onClick={fetchEpidays} disabled={isLoadingEpidays}>
                  에피데이 더보기
                </SeeMoreButton>
              )}
            </InnerLayout>
          ) : (
            <NoContents type="에피데이" />
          )}
        </>
      )}
      {activeNav === 'comment' && comments && (
        <>
          {comments.totalCount > 0 ? (
            <>
              <ul className="flex flex-col">
                {comments?.list.map((comment: GetCommentData) => (
                  <li key={comment.id}>
                    <Comment comment={comment} onChangeComments={setComments} isMyPage />
                  </li>
                ))}
              </ul>
              {(!comments || comments?.nextCursor) && (
                <SeeMoreButton onClick={fetchComments} disabled={isLoadingComments}>
                  내 댓글 더보기
                </SeeMoreButton>
              )}
            </>
          ) : (
            <NoContents type="댓글" />
          )}
        </>
      )}
    </section>
  );
}
