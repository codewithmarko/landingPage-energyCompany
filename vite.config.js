import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "sass/main.scss";`,
      },
    },
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       impressum: resolve(__dirname, 'impressum.html'),
  //       dsgvo: resolve(__dirname, 'datenschutz.html'),
  //     },
  //   },
  // },
});
