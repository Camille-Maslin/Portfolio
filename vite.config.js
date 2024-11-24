import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  base: '/',
  server: {
    open: true,
    watch: {
      usePolling: true
    }
  },
  publicDir: 'public'
}); 