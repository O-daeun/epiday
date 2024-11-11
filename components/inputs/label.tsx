import { LabelHTMLAttributes, ReactNode } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Label({
  label,
  required = false,
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <div className={`block ${className}`}>
      <label className="mb-2 flex gap-1 sm:mb-5 sm:gap-[6px]" {...rest}>
        <h2 className="text-sm font-semibold text-var-black-600 sm:text-xl">{label}</h2>
        <b className="pt-[1px] font-medium text-var-error sm:text-2xl">{required && '*'}</b>
      </label>
      {children}
    </div>
  );
}
