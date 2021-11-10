import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './',
  root: path.join(__dirname, './src/renderer'),
});

// const config = {
//   plugins: [vue()],
//   mode: process.env.MODE,
//   root: __dirname,
//   base: '',
//   server: {
//     fs: {
//       strict: true,
//     },
//   },
//   build: {
//     assetsDir: join('.', 'src'),
//     outDir: join('..', '..', 'dist', 'renderer'),
//     rollupOptions: {
//       external: [...builtinModules],
//     },
//   },
// };

// export default config;
