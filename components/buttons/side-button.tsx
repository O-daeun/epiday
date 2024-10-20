import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isVisible?: boolean;
}

export default function SideButton({ children, isVisible = true, ...rest }: Props) {
  return (
    <button
      className={`shadow-side hover:shadow-sideHover flex h-16 min-w-16 items-center justify-center gap-1 rounded-full bg-var-blue-900 px-[21px] text-xl font-semibold text-var-blue-100 duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      {...rest}
    >
      {children}
    </button>
  );
}
