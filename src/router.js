import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import { loadLanguageAsync, localeParamName } from './lang/i18n-setup';
import Login from './views/user/Login.vue';
import Signup from './views/user/Signup.vue';
import BoardsList from './views/board/List.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: BoardsList,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '*',
      component: BoardsList,
      meta: {
        requiresAuth: true,
      },
    },
  ],
  mode: 'history',
});

// Set i18n locale
router.beforeEach((to, from, next) => {
  let lang = localStorage.getItem(localeParamName);

  if (!['en', 'ru'].includes(lang)) {
    lang = 'en';
  }

  loadLanguageAsync(lang).then(() => next());
});

// Check auth required
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }

    next('/login');
  } else {
    next();
  }
});

export default router;
