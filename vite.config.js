import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for assets
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
    },
  },
})
