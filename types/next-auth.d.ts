import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string;
    name: string;
    email: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
  }
}
