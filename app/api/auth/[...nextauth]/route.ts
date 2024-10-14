import { baseUrl } from '@/constants/api-constants';
import { Token } from '@/types/token';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
    async jwt({ token, trigger, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          nickname: user.nickname,
          email: user.email,
          image: user.image,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }
      if (trigger === 'update') {
        return {
          ...token,
          nickname: session.nickname || token.nickname,
          image: session.image || token.image,
        };
      }

      return refreshAccessToken(token as Token);
    },
    async session({ session, token }) {
      const typedToken = token as Token;
      if (token) {
        session.id = typedToken.id as number;
        session.nickname = typedToken.nickname as string;
        session.email = typedToken.email as string;
        session.image = typedToken.image as string | null;
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
