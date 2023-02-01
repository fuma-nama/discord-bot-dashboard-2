import { ReactNode, ReactElement } from 'react';
import { Location, matchRoutes, useLocation } from 'react-router-dom';
import { findLast } from './common';

type MatchRoute = (
  | {
      index?: false;
      path?: string;
      children?: MatchRoute[];
    }
  | {
      index: true;
    }
) & {
  layout: NormalLayout;
};

export function getActiveLayouts(location: Location, layoutes: RootLayout[]): NormalLayout[] {
  function map(layout: NormalLayout): MatchRoute {
    if (layout.index === true) {
      return {
        layout: layout,
        index: true,
      };
    } else {
      return {
        layout: layout,
        path: layout.path,
        children: layout.subLayouts?.map((c) => map(c)),
      };
    }
  }

  const routes = layoutes.map((layout) => map(layout));
  const matches = matchRoutes(routes, location.pathname);

  if (matches == null || matches.length === 0) return null;

  return matches.map((m) => m.route.layout);
}

export function getActiveLayout(location: Location, layouts: RootLayout[]): NormalLayout | null {
  const matches = getActiveLayouts(location, layouts);

  return matches[matches.length - 1];
}

export function getActiveSidebarItem(
  items: SidebarItemInfo[],
  location: Location
): SidebarItemInfo | null {
  const matches = matchRoutes(
    items.map((item) => ({
      item,
      path: item.path,
    })),
    location.pathname
  );
  if (matches == null || matches.length === 0) return null;

  return matches[matches.length - 1].route.item;
}

export function useLayoutOverride(layouts: RootLayout[], filter: (item: NormalLayout) => boolean) {
  const location = useLocation();
  const override = findLast(getActiveLayouts(location, layouts), filter);

  return override;
}

export type NormalLayout = IndexRoute | NestedLayout;

export type NestedLayout = Layout & {
  path?: string;
  subLayouts?: NormalLayout[];
  index?: false;
};

export type IndexRoute = Layout & {
  index: true;
};

export type Layout = {
  component?: ReactNode;
  navbar?: ReactElement;
  sidebar?: ReactElement;
};

export type RootLayout = NormalLayout & {
  loggedIn?: boolean;
};

export interface SidebarItemInfo {
  name: ReactNode;
  icon?: JSX.Element;
  path: string;
  hidden?: boolean;
}
