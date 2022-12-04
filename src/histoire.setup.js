import { defineSetupVue3 } from '@histoire/plugin-vue'
import i18n from '@/i18n';
import { createPinia } from 'pinia';
import '@assets/scss/main.scss';

export const setupVue3 = defineSetupVue3(({ app }) => {
    app.use(i18n);
    app.use(createPinia());
});
