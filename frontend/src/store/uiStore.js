import { create } from 'zustand';

/**
 * UI state store for managing sidebar collapse and page title.
 */
const useUiStore = create((set) => ({
  sidebarCollapsed: false,
  pageTitle: 'Dashboard',

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setPageTitle: (title) => set({ pageTitle: title }),
}));

export default useUiStore;
