import { inputStyle } from './input-styles';

export default function EmailInput() {
  return <input className={`mb-4 ${inputStyle.auth}`} placeholder="이메일" />;
}
