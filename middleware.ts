// /middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(async function middleware(req) {
  const url = req.nextUrl;
  const isLoginPage = url.pathname === '/login' || url.pathname === '/signup';

  // next-auth 세션 쿠키를 확인하여 로그인 상태를 체크
  const token =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token');
  const isLoggedIn = !!token;

  // 로그인 상태에서 로그인/회원가입 페이지 접근 시 /epidays로 리다이렉트
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/epidays', req.url));
  }

  // 로그인하지 않은 상태에서 보호된 경로 접근 시 /login으로 리다이렉트
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/epidays', '/epidays/:path*', '/addepiday', '/mypage'], // 보호하고자 하는 경로 지정
};
