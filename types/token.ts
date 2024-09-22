import { JWT } from 'next-auth/jwt';

export interface Token extends JWT {
  accessToken: string;
  refreshToken: string;
  error?: string;
}
