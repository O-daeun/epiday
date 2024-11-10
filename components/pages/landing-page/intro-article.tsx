import Image from 'next/image';
import { ReactNode } from 'react';
import Title from './title';

interface Props {
  title: ReactNode;
  contents: ReactNode;
  imageUrl: string;
  isReverse?: boolean;
}

export default function IntroArticle({ title, contents, imageUrl, isReverse }: Props) {
  return (
    <article
      className={`flex flex-col gap-10 sm:gap-20 ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      <div>
        <Image src={imageUrl} width={744} height={388} alt="" className="h-auto w-full" />
      </div>
      <div className="flex shrink-0 flex-col justify-end gap-4 sm:gap-10">
        <Title className={`md:w-fit ${isReverse ? 'text-end' : ''}`}>{title}</Title>
        <p
          className={`text-var-blue-600 sm:text-2xl sm:font-medium sm:leading-8 ${isReverse ? 'text-end' : ''}`}
        >
          {contents}
        </p>
      </div>
    </article>
  );
}
