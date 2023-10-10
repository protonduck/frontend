import { createI18n } from 'vue-i18n';
import de from '@plugins/i18n/messages/de';
import en from '@plugins/i18n/messages/en';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'de',
  messages: {
    en,
    de,
  },
});

export default {
  install: (app) => {
    app.use(i18n);
  },
};
