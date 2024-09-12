import AuthHeader from '@/components/header/auth-header';

export default function Layout({ children }) {
  return (
    <div>
      <AuthHeader />
      {children}
    </div>
  );
}
