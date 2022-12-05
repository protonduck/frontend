import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import i18n from '@plugins/i18n';
import pinia from '@plugins/pinia';
import fontAwesome from '@plugins/fontAwesome';

// import main scss styles
import '@assets/scss/main.scss';

const app = createApp(App);

// use plugins
app.use(fontAwesome);
app.use(pinia);
app.use(i18n);

app.use(router);

app.mount('#app');
