import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import { builtinModules } from 'module';

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: __dirname,
  plugins: [vue()],
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    assetsDir: join('.', 'src'),
    outDir: join('..', '..', 'dist', 'renderer'),
    rollupOptions: {
      external: [...builtinModules],
    },
  },
};

export default config;
