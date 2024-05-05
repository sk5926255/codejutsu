import { create } from 'zustand';

interface AdminSidebarState {
  isAdminSidebarDrawerOpen: boolean;
  openAdminSidebar: () => void;
  closeAdminSidebar: () => void;
  toggleAdminSidebar: () => void;
}

const useAdminSidebar = create<AdminSidebarState>((set) => ({
  isAdminSidebarDrawerOpen: false,
  openAdminSidebar: () => set({ isAdminSidebarDrawerOpen: true }),
  closeAdminSidebar: () => set({ isAdminSidebarDrawerOpen: false }),
  toggleAdminSidebar: () =>
    set((state) => ({
      isAdminSidebarDrawerOpen: !state.isAdminSidebarDrawerOpen,
    })),
}));

export default useAdminSidebar;
