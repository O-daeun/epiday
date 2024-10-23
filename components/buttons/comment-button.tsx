import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'black' | 'red';
  children: ReactNode;
}

/**
 * 댓글의 수정, 삭제 버튼
 * note: 기능까지 수행할 수 있게 리팩하기
 */
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
