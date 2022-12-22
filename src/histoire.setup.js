import { defineSetupVue3 } from '@histoire/plugin-vue';
import router from '@/router';
import pinia from '@plugins/pinia';
import i18n from '@plugins/i18n';
import fontAwesome from '@plugins/fontAwesome';

// import main styles
import '@assets/scss/main.scss';

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(router);

  // use plugins
  app.use(i18n);
  app.use(pinia);
  app.use(fontAwesome);
});
