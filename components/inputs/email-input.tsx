import { InputHTMLAttributes } from 'react';
import { inputStyle } from './input-styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function EmailInput({ value, onChange, className = '' }: Props) {
  return (
    <input
      type="email"
      value={value}
      onChange={onChange}
      className={`${inputStyle.auth} ${className}`}
      placeholder="이메일"
    />
  );
}
