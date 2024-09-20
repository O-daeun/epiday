import { LabelHTMLAttributes, ReactNode } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  isRequired?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Label({
  label,
  isRequired = false,
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <label className={className} {...rest}>
      <h2 className="mb-5 flex gap-[6px]">
        <span className="text-xl font-semibold text-var-black-600">{label}</span>
        <b className="pt-[1px] text-2xl font-medium text-var-error">{isRequired && '*'}</b>
      </h2>
      {children}
    </label>
  );
}