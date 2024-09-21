import 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }

  interface JWT {
    id: string;
    nickname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }
}
