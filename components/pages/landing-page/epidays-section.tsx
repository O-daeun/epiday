import { getEpidays } from '@/apis/epiday/get-epidays';
import EpidayBox from '@/components/epiday-box';
import Image from 'next/image';
import InnerLayout from '../../inner-layout';
import Title from './title';

const limit = 3;

export default async function EpidaysSection() {
  const epidays = await getEpidays({ limit });

  return (
    <section className="-mb-[30px] bg-var-background pb-16">
      <InnerLayout>
        <Title className="text-center">
          사용자들이 직접
          <br />
          인용한 에피그램들
        </Title>
        <ul className="mt-10 flex flex-col gap-4 sm:mt-[100px] sm:gap-[60px]">
          {epidays.list.map((epiday) => (
            <li key={epiday.id}>
              <EpidayBox epiday={epiday} />
            </li>
          ))}
        </ul>
        <Image
          src="/kebab-blue.svg"
          width={36}
          height={36}
          alt="etc"
          className="mx-auto mt-10 size-6 sm:size-9"
        />
      </InnerLayout>
    </section>
  );
}
