import { GetProfile, PatchProfile } from '@/types/profile-types';
import { Session } from 'next-auth';
import { fetchWithToken } from '../fetch-with-token';

export const patchUser = async (session: Session, data: PatchProfile): Promise<GetProfile> => {
  const response = await fetchWithToken('PATCH', '/users/me', session, data);

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '이미지 업로드 실패');
  }

  return response.json();
};
