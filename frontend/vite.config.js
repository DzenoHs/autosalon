import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    // ako želiš dev proxy ka backendu (prilagodi port i putanje)
    proxy: {
      '/api': {
        target: 'http://localhost:5003',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      // primer: '@' -> src
      '@': '/src',
    },
  },
  build: {
    outDir: 'build',
  },
})