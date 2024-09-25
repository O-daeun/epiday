import 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: number;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    image: string | null;
  }

  interface User {
    id: number;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    image: string | null;
  }

  interface JWT {
    id: number;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    image: string | null;
  }
}
