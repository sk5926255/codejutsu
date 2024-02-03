import { create } from "zustand";

interface LoginDrawerState {
  isLoginDrawerOpen: boolean;
  openLoginDrawer: () => void;
  closeLoginDrawer: () => void;
  toggleLoginDrawer: () => void;
}

const useLoginDrawer = create<LoginDrawerState>((set) => ({
  isLoginDrawerOpen: false,
  openLoginDrawer: () => set({ isLoginDrawerOpen: true }),
  closeLoginDrawer: () => set({ isLoginDrawerOpen: false }),
  toggleLoginDrawer: () =>
    set((state) => ({ isLoginDrawerOpen: !state.isLoginDrawerOpen })),
}));

export default useLoginDrawer;
