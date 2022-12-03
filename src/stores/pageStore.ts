import create from 'zustand';

export type PageStore = {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (v: boolean) => void;
};

export const usePageStore = create<PageStore>((set) => ({
  sidebarIsOpen: false,
  setSidebarIsOpen: (v) => set({ sidebarIsOpen: v }),
}));
