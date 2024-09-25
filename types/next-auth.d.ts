import 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    image: string | null;
  }

  interface User {
    id: string;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    image: string | null;
  }

  interface JWT {
    id: string;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    image: string | null;
  }
}
