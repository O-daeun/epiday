import Button from '../../buttons/button';

export default function LastSection() {
  return (
    <section className="relative flex h-screen min-h-[530px] flex-col items-center justify-center bg-[repeating-linear-gradient(white,white_25px,#F2F2F2_27px)] pt-[52px] sm:bg-[repeating-linear-gradient(white,white_35px,#F2F2F2_37px)] sm:pt-20">
      <h2 className="text-center font-iropke text-3xl font-extrabold leading-relaxed text-var-black-500 sm:text-[40px]">
        날마다
        <br />
        에피데이
      </h2>
      <Button link="/login" className="mt-8 sm:mt-12">
        시작하기
      </Button>
    </section>
  );
}
