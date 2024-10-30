import { GetImage } from '@/types/profile-types';
import { Session } from 'next-auth';
import { fetchWithToken } from '../fetch-with-token';

export const postImage = async (session: Session, imageFile: File): Promise<GetImage> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetchWithToken('POST', '/images/upload', session, formData);

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || '이미지 업로드 실패');
  }

  return response.json();
};
