import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Portfolio/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
}); 