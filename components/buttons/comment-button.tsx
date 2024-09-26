import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'black' | 'red';
  children: ReactNode;
}
export default function CommentButton({ color, children, ...rest }: Props) {
  return (
    <button
      type="button"
      className={`h-[22px] border-b-[1.5px] ${color === 'black' ? 'border-var-black-600' : 'border-var-error text-var-error'}`}
      {...rest}
    >
      {children}
    </button>
  );
}
