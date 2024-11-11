import { ReactNode } from 'react';

interface Props {
  isRight?: boolean;
  children: ReactNode;
}

export default function ErrorMessage({ isRight, children }: Props) {
  return (
    <span
      role="alert"
      className={`block text-[13px] leading-[162.5%] text-var-error sm:text-base ${isRight ? 'text-right' : 'pl-2'}`}
    >
      {children}
    </span>
  );
}
