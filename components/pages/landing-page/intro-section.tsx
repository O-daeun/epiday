import IntroArticle from './intro-article';

export default function IntroSection() {
  return (
    <div className="-mt-10 w-full bg-var-background py-[240px]">
      <div className="mx-auto flex w-full max-w-[688px] flex-col gap-[196px] px-6 sm:gap-[220px] md:max-w-[1968px] md:gap-[380px]">
        <IntroArticle
          title={
            <>
              명언이나 글귀,
              <br />
              토막 상식들을 공유해 보세요.
            </>
          }
          contents={
            <>
              나만 알던 소중한 글들을
              <br />
              다른 사람들에게 전파하세요.
            </>
          }
          imageUrl="/landing-1.png"
        />
        <IntroArticle
          title={
            <>
              감정 상태에 따라,
              <br />
              알맞은 위로를 받을 수 있어요.
            </>
          }
          contents={<>태그를 통해 글을 모아 볼 수 있어요.</>}
          imageUrl="/landing-2.png"
          isReverse
        />
        <IntroArticle
          title={
            <>
              내가 요즘 어떤 감정 상태인지
              <br />
              통계로 한눈에 볼 수 있어요.
            </>
          }
          contents={
            <>
              감정 달력으로
              <br />내 마음에 담긴 감정을 확인해보세요.
            </>
          }
          imageUrl="/landing-3.png"
        />
      </div>
    </div>
  );
}
