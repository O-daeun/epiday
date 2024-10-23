import SnsLoginButton from './sns-login-button';

function Line() {
  return <div className="h-[1px] w-full bg-var-gray-200" />;
}

export default function SnsLogin() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-6">
        <Line />
        <h2 className="shrink-0 text-xl font-normal text-var-blue-400">SNS 계정으로 로그인하기</h2>
        <Line />
      </div>
      <div className="flex justify-center gap-4">
        <SnsLoginButton sns="google" />
        <SnsLoginButton sns="kakao" />
      </div>
    </div>
  );
}
