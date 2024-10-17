import Image from 'next/image';
import Button from '../buttons/button';

export default function MainSection() {
  return (
    <main className="relative flex h-screen min-h-[530px] flex-col items-center justify-center bg-[repeating-linear-gradient(white,white_35px,#F2F2F2_37px)] pb-20">
      <h1 className="text-center font-iropke text-[40px] font-normal leading-relaxed text-var-black-500">
        나만 갖고 있기엔
        <br />
        아까운 글이 있지 않나요?
      </h1>
      <p className="mt-10 text-center font-iropke text-xl text-var-black-300">
        다른 사람들과 감정을 공유해 보세요.
      </p>
      <Button link="/login" className="mt-12">
        시작하기
      </Button>
      <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
        <span className="font-semibold text-var-blue-400">더 알아보기</span>
        <Image src="/arrow-down.svg" width={24} height={24} alt="아래방향 화살표" />
      </div>
    </main>
  );
}
