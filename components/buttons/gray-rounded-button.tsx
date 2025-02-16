import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function GrayRoundedButton({ children, ...rest }: Props) {
  return (
    <button
      className="block rounded-full bg-var-line-100 px-[15px] py-[6px] text-sm font-medium text-var-gray-300 duration-200 hover:bg-var-line-200/50 sm:text-xl"
      {...rest}
    >
      {children}
    </button>
  );
}
