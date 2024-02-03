import { create } from "zustand";

interface RegisterDrawerState {
  isRegisterDrawerOpen: boolean;
  openRegisterDrawer: () => void;
  closeRegisterDrawer: () => void;
  toggleRegisterDrawer: () => void;
}

const useRegisterDrawer = create<RegisterDrawerState>((set) => ({
  isRegisterDrawerOpen: false,
  openRegisterDrawer: () => set({ isRegisterDrawerOpen: true }),
  closeRegisterDrawer: () => set({ isRegisterDrawerOpen: false }),
  toggleRegisterDrawer: () =>
    set((state) => ({ isRegisterDrawerOpen: !state.isRegisterDrawerOpen })),
}));

export default useRegisterDrawer;
