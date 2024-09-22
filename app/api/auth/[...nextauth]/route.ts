import { baseUrl } from '@/constants/api-constants';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

interface Token extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  error?: string;
}

async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const response = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        ...token,
        accessToken: data.accessToken,
        accessTokenExpires: Date.now() + 3600 * 1000, // 1시간
      };
    } else {
      throw new Error(data.message || '리프레시 토큰 갱신 실패');
    }
  } catch (error) {
    console.error('리프레시 토큰 갱신 중 오류 발생: ', error);
    return {
      ...token,
      error: '리프레시 토큰 갱신 실패',
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(`${baseUrl}/auth/signIn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const data = await response.json();

        if (response.ok && data?.user) {
          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } else {
          throw new Error(data.message || '로그인에 실패했습니다.');
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
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 3600 * 1000, // 1시간 동안 유효
        };
      }

      if (Date.now() < (token as Token).accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token as Token);
    },
    async session({ session, token }) {
      const typedToken = token as Token;
      if (token) {
        session.id = typedToken.id as string;
        session.nickname = typedToken.nickname as string;
        session.email = typedToken.email as string;
        session.accessToken = typedToken.accessToken as string;
        session.refreshToken = typedToken.refreshToken as string;
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
