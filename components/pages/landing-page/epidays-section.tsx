import { fetchWithoutToken } from '@/api/fetch-without-token';
import Image from 'next/image';
import EpidayBox from '../../epiday-box';
import InnerLayout from '../../inner-layout';
import Title from './title';

export default async function EpidaysSection() {
  const response = await fetchWithoutToken('GET', '/epigrams?limit=3');
  const { list: epidays } = await response.json();

  return (
    <section className="-mb-[30px] bg-var-background pb-16">
      <InnerLayout>
        <Title className="text-center">
          사용자들이 직접
          <br />
          인용한 에피그램들
        </Title>
        <ul className="mt-[100px] flex flex-col gap-[60px]">
          {epidays.map((epiday) => (
            <li key={epiday.id}>
              <EpidayBox epiday={epiday} />
            </li>
          ))}
        </ul>
        <Image src="/kebab-blue.svg" width={36} height={36} alt="etc" className="mx-auto mt-10" />
      </InnerLayout>
    </section>
  );
}
