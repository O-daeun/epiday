import { InputHTMLAttributes } from 'react';
import { inputStyle } from './input-styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function PasswordInput({ value, onChange, className = '' }: Props) {
  return (
    <input
      type="password"
      value={value}
      onChange={onChange}
      className={`${inputStyle.auth} ${className}`}
      placeholder="비밀번호"
    />
  );
}
