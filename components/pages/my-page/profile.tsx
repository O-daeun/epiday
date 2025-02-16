import ProfileImageSkeleton from '@/components/skeletons/profile-image-skeleton';
import TextSkeleton from '@/components/skeletons/text-skeleton';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useModalStore } from '@/store/use-modal-store';
import { useToastStore } from '@/store/use-toast-store';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GrayRoundedButton from '../../buttons/gray-rounded-button';
import EditProfileModal from '../../modals/edit-profile-modal';
import ProfileImage from '../../profile-image';

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const { showToast } = useToastStore();
  const { openModal } = useModalStore();

  const handleLogout = async () => {
    try {
      const result = await signOut({ redirect: false });
      if (result?.url) {
        router.replace('/login');
      }
    } catch (error) {
      showToast({ message: TOAST_MESSAGES.error, type: 'error' });
      console.error('로그아웃 중 예외 발생: ', error);
    }
  };

  return (
    <div className="mx-auto flex translate-y-[-40px] transform flex-col items-center sm:translate-y-[-60px]">
      {session ? (
        <>
          <ProfileImage nickname={session.nickname} imageUrl={session.image} size="l" priority />
          <h1 className="mt-2 font-medium text-var-black-950 sm:mt-4 sm:text-2xl">
            {session.nickname}
          </h1>
        </>
      ) : (
        <>
          <ProfileImageSkeleton size="l" />
          <TextSkeleton width="w-11 sm:w-16" height="h-6 sm:h-8" className="mt-2 sm:mt-4" />
        </>
      )}

      <div className="mx-auto mt-4 flex gap-2 sm:mt-6 sm:gap-4">
        <GrayRoundedButton onClick={() => openModal(<EditProfileModal />)}>
          프로필 편집
        </GrayRoundedButton>
        <GrayRoundedButton onClick={handleLogout}>로그아웃</GrayRoundedButton>
      </div>
    </div>
  );
}
