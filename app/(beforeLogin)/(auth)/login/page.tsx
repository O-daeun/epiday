import Button from '@/components/buttons/button';
import EmailInput from '@/components/inputs/email-input';
import PasswordInput from '@/components/inputs/password-input';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="bg-var-background py-[213px]">
      <div className="mx-auto max-w-[688px] px-6">
        <Link href="/" className="mx-auto mb-[60px] block w-fit">
          <Image src="/logo.svg" width={152} height={48} alt="Epiday logo" />
        </Link>
        <EmailInput />
        <PasswordInput />
        <Button design="wide">로그인</Button>
      </div>
    </div>
  );
}
