import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://felixfong227.me',
  vite: {
    plugins: [tailwindcss()],
  },
});
