import glsl from 'vite-plugin-glsl';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  plugins: [glsl()],
  css: {
    preprocessorOptions: {
      sass: {
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
