import { createPinia } from 'pinia';

export default {
  install: (app) => {
    app.use(createPinia());
  },
};
