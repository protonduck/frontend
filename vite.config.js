import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@i18n': fileURLToPath(new URL('./src/i18n', import.meta.url)),
      '@blocks': fileURLToPath(new URL('./src/components/Blocks', import.meta.url)),
      '@elements': fileURLToPath(new URL('./src/components/Elements', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/components/Modules', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)), 
    }
  }
})
