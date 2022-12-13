import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      include: ['**/*.tsx', '**/*.jsx'],
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      assets: path.resolve(__dirname, './src/assets'),
      stores: path.resolve(__dirname, './src/stores'),
      theme: path.resolve(__dirname, './src/theme'),
      config: path.resolve(__dirname, './src/config'),
      api: path.resolve(__dirname, './src/api'),
      layouts: path.resolve(__dirname, './src/layouts'),
      sidebar: path.resolve(__dirname, './src/sidebar.tsx'),
      utils: path.resolve(__dirname, './src/utils'),
      views: path.resolve(__dirname, './src/views'),
      hooks: path.resolve(__dirname, './src/hooks'),
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
});
