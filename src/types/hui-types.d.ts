export {};

declare global {
  interface SidebarItem {
    name: string;
    icon?: JSX.Element;
    path: string;
  }
}
