import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/consult/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['smooth-scroll'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})