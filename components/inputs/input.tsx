import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...rest }: Props) {
  return (
    <input
      className={`h-16 w-full rounded-xl border border-var-blue-300 px-4 text-xl outline-none placeholder:text-var-blue-400 focus:border-var-blue-600 ${className}`}
      {...rest}
    />
  );
}
