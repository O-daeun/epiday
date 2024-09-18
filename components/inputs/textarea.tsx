import { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea({ ...rest }: Props) {
  return (
    <textarea
      className="h-[148px] w-full rounded-xl border border-var-blue-300 px-4 py-[10px] text-xl outline-none placeholder:text-var-blue-400 focus:border-var-blue-600"
      {...rest}
    />
  );
}
