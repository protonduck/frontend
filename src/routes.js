import Login from './views/user/Login.vue';
import Signup from './views/user/Signup.vue';
import BoardsList from './views/board/List.vue';

// eslint-disable-next-line import/prefer-default-export
export const routes = [
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
];
