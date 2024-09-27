import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  design: 'gray' | 'black';
}

export default function ModalButton({ children, design, onClick, ...rest }: Props) {
  return (
    <button
      className={`flex h-[58px] w-full grow items-center justify-center rounded-xl bg-var-black-500 text-xl duration-100 ${design === 'gray' ? 'bg-var-blue-200 text-var-black-700 hover:bg-var-blue-300/70' : 'bg-var-blue-900 text-var-blue-100 hover:bg-var-blue-900/90'} `}
      onClick={onClick}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
