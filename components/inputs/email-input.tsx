import { inputStyle } from './input-styles';

interface Props {
  value: string;
}

export default function EmailInput({ value }: Props) {
  return (
    <input type="email" value={value} className={`mb-4 ${inputStyle.auth}`} placeholder="이메일" />
  );
}
