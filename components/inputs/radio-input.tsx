import Image from 'next/image';
import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput = forwardRef<HTMLInputElement, Props>(function RadioInput(
  { label, checked, onChange, value, ...rest },
  ref,
) {
  return (
    <label htmlFor={`radio-${value}`} className="flex cursor-pointer items-center gap-2">
      <input
        type="radio"
        ref={ref}
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
        className="size-5 sm:size-6"
      />
      <span className="sm:text-xl">{label}</span>
    </label>
  );
});

export default RadioInput;
