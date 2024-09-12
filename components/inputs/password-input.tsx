import { inputStyle } from './input-styles';

export default function PasswordInput() {
  return <input className={`mb-6 ${inputStyle.auth}`} placeholder="비밀번호" />;
}
