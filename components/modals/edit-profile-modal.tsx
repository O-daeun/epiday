import { fetchWithToken } from '@/api/fetch-with-token';
import { TOAST_MESSAGES } from '@/constants/toast-messages';
import { useModalStore } from '@/store/use-modal-store';
import { useToastStore } from '@/store/use-toast-store';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Button from '../buttons/button';
import ModalButton from '../buttons/modal-button';
import Input from '../inputs/input';
import Label from '../inputs/label';

export default function EditProfileModal() {
  const { data: session } = useSession();
  const { showToast } = useToastStore();
  const { closeModal } = useModalStore();
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [nickname, setNickname] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [testFile, setTestFile] = useState(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setTestFile(file);
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        showToast({ message: '파일 크기가 5MB를 초과할 수 없습니다.', type: 'error' });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImage(reader.result as string);
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

  const handleUploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetchWithToken('POST', '/images/upload', session, formData);
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      return data;
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
  };

  const handleTest = async () => {
    if (!testFile) return; // 파일이 없으면 반환

    const formData = new FormData();
    formData.append('file', testFile);

    const response = await fetchWithToken('POST', '/images/upload', session, formData);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const { message } = await response.json();
      showToast({ message, type: 'error' });
    }
  };

  const handleSave = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();

      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error('blob 생성 실패');
          return;
        }
        const file = new File([blob], 'profile_image.png', { type: 'image/jpeg' });

        const imageUrl = await handleUploadImage(file);

        if (imageUrl) {
          const response = await fetchWithToken('POST', '/users/me', session, {
            nickname,
            image: imageUrl,
          });

          if (response.ok) {
            showToast({ message: TOAST_MESSAGES.profile.updateSuccess, type: 'success' });
          } else {
            const { message } = await response.json();
            showToast({ message, type: 'error' });
          }
        }
      }, 'image/png');
    }
  };

  useEffect(() => {
    if (session && !nickname) {
      setImage(session.image);
      setNickname(session.nickname);
    }
  }, [session]);

  if (!session) return;

  return (
    <div className="w-[calc(100vw-40px)] max-w-[452px] px-[38px] py-10">
      <Label label="닉네임">
        <Input
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
          maxLength={20}
        />
      </Label>
      <Label label="프로필 이미지" className="mt-10">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </Label>
      <div className="flex justify-between">
        <Button design="main" onClick={handleFileClick} className="!h-12 w-[184px] grow-0 !text-lg">
          파일 선택
        </Button>
        {image && (
          <div className="flex items-center gap-2">
            <ModalButton design="gray" onClick={decreaseScale} className="!size-12">
              <Image src="/minus.svg" width={25} height={25} alt="+" />
            </ModalButton>
            <div className="flex flex-col items-center font-semibold">
              <span className="text-var-black-400">Zoom</span>
              <span className="-mt-1 text-var-black-400">{scale.toFixed(1)}</span>
            </div>
            <ModalButton design="gray" onClick={increaseScale} className="!size-12">
              <Image src="/plus.svg" width={25} height={25} alt="+" />
            </ModalButton>
          </div>
        )}
      </div>
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
          />
        </div>
      )}
      <div className="flex gap-2">
        <ModalButton design="gray" onClick={closeModal} className="mt-12">
          취소
        </ModalButton>
        <ModalButton design="black" onClick={handleSave} className="mt-12">
          저장
        </ModalButton>
      </div>
      <button onClick={handleTest}>클릭</button>
    </div>
  );
}
