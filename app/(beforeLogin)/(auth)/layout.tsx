import AuthHeader from '@/components/headers/auth-header';

export default function Layout({ children }) {
  return (
    <div>
      <AuthHeader />
      {children}
    </div>
  );
}
