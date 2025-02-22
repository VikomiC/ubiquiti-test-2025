import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    // svgr options: https://react-svgr.com/docs/options/
    svgr({
      // svgrOptions: { icon: true },
      include: ['**/*.svg', '**/*.svg?react'],
    }),
    nodePolyfills(),
  ],
});