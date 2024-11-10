import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isVisible?: boolean;
}

export default function SideButton({ children, isVisible = true, ...rest }: Props) {
  return (
    <button
      className={`flex h-12 min-w-12 items-center justify-center gap-1 rounded-full bg-var-blue-900 px-[14px] text-sm font-semibold text-var-blue-100 shadow-side duration-300 hover:shadow-sideHover sm:h-16 sm:min-w-16 sm:px-[21px] sm:text-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      {...rest}
    >
      {children}
    </button>
  );
}
