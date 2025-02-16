import LoginLink from '../login-link';
import LogoLink from '../logo-link';
import HeaderLayout from './header-layout';

export default function LandingHeader() {
  return (
    <HeaderLayout className="justify-center">
      <LogoLink />
      <LoginLink />
    </HeaderLayout>
  );
}
