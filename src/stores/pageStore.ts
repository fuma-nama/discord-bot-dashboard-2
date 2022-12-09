import create from 'zustand';

export type PageStore = {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (v: boolean) => void;
  devMode: boolean;
  setDevMode: (v: boolean) => void;
};

export const usePageStore = create<PageStore>((set) => ({
  sidebarIsOpen: false,
  devMode: false,
  setDevMode: (v) => set({ devMode: v }),
  setSidebarIsOpen: (v) => set({ sidebarIsOpen: v }),
}));
