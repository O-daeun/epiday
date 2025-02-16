import { LabelHTMLAttributes, ReactNode } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  className?: string;
  children: ReactNode;
}

export default function AuthLabel({ htmlFor, label, className = '', children }: Props) {
  return (
    <label htmlFor={htmlFor} className={`flex flex-col gap-4 sm:gap-5 ${className}`}>
      <span className="text-sm font-medium text-var-blue-900 sm:text-xl">{label}</span>
      {children}
    </label>
  );
}
