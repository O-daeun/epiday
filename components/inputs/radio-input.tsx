import Image from 'next/image';
import { ChangeEvent, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioInput({ label, checked, onChange, value, ...rest }: Props) {
  return (
    <label htmlFor={`radio-${value}`} className="flex cursor-pointer items-center gap-2">
      <input
        type="radio"
        id={`radio-${value}`}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
        {...rest}
      />
      <Image
        src={checked ? '/radio-on.svg' : '/radio-off.svg'}
        alt={checked ? '체크됨' : '체크되지 않음'}
        width={24}
        height={24}
      />
      <span className="text-xl">{label}</span>
    </label>
  );
}
