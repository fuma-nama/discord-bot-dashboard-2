import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { LoadingPanel } from 'components/panel/LoadingPanel';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { client, useLoginQuery } from 'stores';
import { theme } from 'theme';
import { QueryStatus } from './components/panel/QueryPanel';
import './index.css';
import { layouts } from './layouts';
import { NormalLayout } from './utils/routeUtils';
import { createRoot } from 'react-dom/client';

function RootRoutes({ loggedIn }: { loggedIn: boolean }) {
  function mapNestedLayout(layout: NormalLayout, key: string | number) {
    if (layout.index === true) {
      return <Route index key={key} element={layout.component} />;
    } else {
      return (
        <Route key={key} path={layout.path} element={layout.component}>
          {layout.subLayouts && layout.subLayouts.map(mapNestedLayout)}
        </Route>
      );
    }
  }
  return (
    <Routes>
      {layouts.map((layout, key) =>
        layout.loggedIn === loggedIn ? mapNestedLayout(layout, key) : null
      )}
    </Routes>
  );
}

function Pages() {
  const query = useLoginQuery();

  return (
    <QueryStatus query={query} error="Failed to login" loading={<LoadingPanel size="lg" />}>
      <RootRoutes loggedIn={query.data != null} />
    </QueryStatus>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={client}>
      <React.StrictMode>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </React.StrictMode>
    </QueryClientProvider>
  </ChakraProvider>
);
