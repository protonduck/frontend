import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import HomeView from '@/views/HomeView.vue';
import StatsView from '@/views/StatsView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ErrorView from '@/views/ErrorView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: true },
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
      meta: { auth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'Error404',
      component: ErrorView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.matched.some((record) => record.meta.auth) && to.name !== 'login' && !userStore.isLoggedIn) {
    next({ name: 'login' });
    return;
  }

  next();
});

export default router;
