import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@elements': fileURLToPath(new URL('./src/components/Elements', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/components/Modules', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/components/Views', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
    },
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
});
