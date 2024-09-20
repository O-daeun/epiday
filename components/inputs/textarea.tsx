import { TextareaHTMLAttributes, forwardRef } from 'react';
import ErrorMessage from './error-message';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea({ error, ...rest }, ref) {
  return (
    <>
      <textarea
        ref={ref}
        className={`h-[148px] w-full rounded-xl border px-4 py-[10px] text-xl outline-none placeholder:text-var-blue-400 ${error ? 'border-var-error' : 'border-var-blue-300 focus:border-var-blue-600'}`}
        {...rest}
      />
      {error && <ErrorMessage isRight>{error}</ErrorMessage>}
    </>
  );
});
export default Textarea;
