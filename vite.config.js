import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Portfolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      '@scripts': '/src/scripts'
    }
  }
}); 