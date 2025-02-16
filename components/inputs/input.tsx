import { InputHTMLAttributes, forwardRef } from 'react';
import ErrorMessage from './error-message';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { error, className = '', type = 'text', ...rest },
  ref,
) {
  return (
    <>
      <input
        type={type}
        className={`h-11 w-full rounded-xl border px-4 outline-none placeholder:text-var-blue-400 sm:h-16 sm:text-xl ${error ? 'border-var-error' : 'border-var-blue-300 focus:border-var-blue-600'} ${className}`}
        ref={ref}
        {...rest}
      />
      {error && <ErrorMessage isRight>{error}</ErrorMessage>}
    </>
  );
});

export default Input;
