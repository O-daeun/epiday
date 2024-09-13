import { baseUrl } from '@/constants/api-constants';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// NextAuth 설정
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 백엔드 API 호출
        const res = await fetch(`${baseUrl}/auth/signIn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        // 로그인 성공 여부 확인
        if (res.ok && user) {
          return user;
        } else {
          return null; // 인증 실패 시 null 반환
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id as string;
        session.name = token.name as string;
        session.email = token.email as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
