import { patchUser } from '@/apis/profile/patch-user';
import { postImage } from '@/apis/profile/post-image';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useModalStore } from '@/store/use-modal-store';
import { useToastStore } from '@/store/use-toast-store';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Button from '../buttons/button';
import Input from '../inputs/input';
import Label from '../inputs/label';
import ModalButton from './modal-button';

export default function EditProfileModal() {
  const { data: session, update } = useSession();
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const [image, setImage] = useState<string | null>(null);
  const [initialImage, setInitialImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [nickname, setNickname] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        showToast({ message: '파일 크기가 5MB를 초과할 수 없습니다.', type: 'error' });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImage(reader.result as string);
      setInitialImage(null);
    }
  };

  const increaseScale = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // 최대 확대 비율 3
  };

  const decreaseScale = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1)); // 최소 축소 비율 1
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    const updatedProfile: { nickname: string; image?: string } = { nickname };

    if (editorRef.current && image) {
      const imageBlob = await new Promise<Blob | null>((resolve) => {
        const canvas = editorRef.current.getImageScaledToCanvas();
        canvas.toBlob(async (blob) => {
          if (!blob) {
            console.error('blob 생성 실패');
            resolve(null);
          } else {
            resolve(blob);
          }
        }, 'image/jpeg');
      });
      if (imageBlob) {
        const file = new File([imageBlob], 'profile_image.png', { type: 'image/jpeg' });

        const imageUrl = await postImage(session, file);
        if (imageUrl) {
          updatedProfile.image = imageUrl.url;
        }
      }
    }
    const newProfile = await patchUser(session, updatedProfile);

    if (newProfile) {
      showToast({ message: TOAST_MESSAGES.profile.updateSuccess, type: 'success' });
      update({ nickname: newProfile.nickname, image: newProfile.image });
      closeModal();
    }
  };

  useEffect(() => {
    if (session && !nickname) {
      setNickname(session.nickname);
      setInitialImage(session.image);
    }
  }, [session]);

  if (!session) return;

  return (
    <div className="w-[calc(100vw-40px)] max-w-[452px] p-6 sm:px-[38px] sm:py-10">
      <Label label="닉네임">
        <Input
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
          maxLength={20}
        />
      </Label>
      <Label label="프로필 이미지" className="mt-5 sm:mt-10">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </Label>
      <div className="flex items-center justify-between">
        <Button
          design="main"
          onClick={handleFileClick}
          className="!h-8 w-[120px] grow-0 text-sm sm:!h-12 sm:w-[184px] sm:!text-lg"
        >
          파일 선택
        </Button>
        {image && (
          <div className="flex items-center gap-2">
            <ModalButton design="gray" onClick={decreaseScale} className="!size-8 sm:!size-12">
              <Image
                src="/minus.svg"
                width={25}
                height={25}
                alt="+"
                className="size-4 sm:size-[25px]"
              />
            </ModalButton>
            <div className="flex flex-col items-center font-semibold">
              <span className="text-xs text-var-black-400 sm:text-base">Zoom</span>
              <span className="-mt-1 text-var-black-400">{scale.toFixed(1)}</span>
            </div>
            <ModalButton design="gray" onClick={increaseScale} className="!size-8 sm:!size-12">
              <Image
                src="/plus.svg"
                width={25}
                height={25}
                alt="+"
                className="size-4 sm:size-[25px]"
              />
            </ModalButton>
          </div>
        )}
      </div>
      {initialImage && (
        <Image
          src={session.image}
          width={375}
          height={375}
          alt="프로필 사진"
          className="mt-3 rounded-full"
        />
      )}
      {image && (
        <div className="mx-auto mt-3 size-fit overflow-hidden rounded-xl">
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={335}
            height={335}
            border={20}
            borderRadius={200}
            scale={scale}
            className="!size-full"
          />
        </div>
      )}
      <div className="mt-6 flex gap-2 sm:mt-12">
        <ModalButton design="gray" onClick={closeModal}>
          취소
        </ModalButton>
        <ModalButton design="black" onClick={handleSave}>
          저장
        </ModalButton>
      </div>
    </div>
  );
}
