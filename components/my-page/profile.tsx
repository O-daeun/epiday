import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useModalStore } from '@/store/use-modal-store';
import { useToastStore } from '@/store/use-toast-store';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GrayRoundedButton from '../buttons/gray-rounded-button';
import EditProfileModal from '../modals/edit-profile-modal';
import ProfileImage from '../profile-image';

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();

  const handleLogout = async () => {
    try {
      const result = await signOut({ redirect: false });
      if (result?.url) {
        router.push('/login');
      }
    } catch (error) {
      showToast({ message: TOAST_MESSAGES.error, type: 'error' });
      console.error('로그아웃 중 예외 발생: ', error);
    }
  };

  if (!session) return;
  return (
    <div className="mx-auto flex translate-y-[-60px] transform flex-col items-center">
      <ProfileImage nickname={session.nickname} imageUrl={session.image} size="l" />
      <h1 className="mt-4 text-2xl font-medium text-var-black-950">{session.nickname}</h1>
      <div className="mx-auto mt-6 flex gap-4">
        <GrayRoundedButton onClick={() => openModal(<EditProfileModal />)}>
          프로필 편집
        </GrayRoundedButton>
        <GrayRoundedButton onClick={handleLogout}>로그아웃</GrayRoundedButton>
      </div>
    </div>
  );
}
