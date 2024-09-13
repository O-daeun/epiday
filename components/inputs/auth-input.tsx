import Image from 'next/image';
import { InputHTMLAttributes, useState } from 'react';
import { inputStyle } from './input-styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

export default function AuthInput({
  value,
  id,
  type = 'text',
  placeholder,
  onChange,
  className = '',
  error,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          type={type !== 'password' ? type : isVisible ? 'text' : 'password'}
          value={value}
          id={id}
          onChange={onChange}
          className={`${inputStyle.auth} ${className}`}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            tabIndex={-1}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <Image
              src={isVisible ? '/visibility-on.svg' : '/visibility-off.svg'}
              alt="눈 아이콘"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {error && <p>error</p>}
    </>
  );
}
