import { create } from 'zustand';

interface ToastMessage {
  message: string;
  type?: 'success' | 'error';
}

interface ToastStore {
  toast: ToastMessage | null;
  showToast: (message: ToastMessage) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  showToast: (message) => set({ toast: message }),
  hideToast: () => set({ toast: null }),
}));
