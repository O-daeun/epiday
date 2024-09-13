import { LabelHTMLAttributes } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  className?: string;
}

export default function AuthLabel({ children, htmlFor, label, className = '' }: Props) {
  return (
    <label htmlFor={htmlFor} className={`flex flex-col gap-5 ${className}`}>
      <span className="text-xl font-medium text-var-blue-900">{label}</span>
      {children}
    </label>
  );
}
