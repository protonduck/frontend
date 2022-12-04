import { defineSetupVue3 } from '@histoire/plugin-vue'
import i18n from './i18n';

export const setupVue3 = defineSetupVue3(({ app}) => {
    app.use(i18n);
});
