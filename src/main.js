import Vue from 'vue';
import Axios from 'axios';
import VueI18n from 'vue-i18n';
import Vuelidate from 'vuelidate';
import Store, { authTokenName } from './store';
import App from './components/App.vue';
import { router } from './router';
import { i18n } from './lang/i18n-setup';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/css/all.css';
// eslint-disable-next-line import/no-extraneous-dependencies,import/extensions
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

try {
  // eslint-disable-next-line global-require,no-multi-assign
  window.$ = window.jQuery = require('jquery');
  // eslint-disable-next-line global-require
  require('bootstrap');
} catch (e) {
  // nothing to do
}

window.Vue = require('vue');

Vue.use(VueI18n);
Vue.use(Vuelidate);

Vue.prototype.$store = Store;
Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

// Authorization
const authToken = localStorage.getItem(authTokenName);

if (authToken) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${authToken}`;
}

const main = new Vue({
  i18n,
  router,
  render: (h) => h(App),
  beforeMount() {
    // set BaseURL for axios
    Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_API_URL;
  },
});

// Mount only if div#app exist
if (document.getElementById('app')) {
  main.$mount('#app');
}
