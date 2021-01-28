import Vue from 'vue';
import Axios from 'axios';
import Store, {authTokenName} from './store';
import App from './components/App';
import Vuelidate from 'vuelidate';
import VueI18n from 'vue-i18n';
import {router} from './router';
import {i18n} from './lang/i18n-setup';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {

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
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
}

const main = new Vue({
    i18n,
    router,
    render: h => h(App),
    beforeMount() {
        // set BaseURL for axios
        Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_API_URL;
    },
});

// Mount only if div#app exist
if (document.getElementById('app')) {
    main.$mount('#app');
}
