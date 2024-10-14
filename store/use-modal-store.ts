import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalStore {
  isOpen: boolean;
  content: ReactNode;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

/**
 * 모달을 열고 닫는 훅
 * @example1 const {openModal} = useModalStore();
 * @example2 openModal(<DeleteModal />)
 */
export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));
