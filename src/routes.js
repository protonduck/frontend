import Login from './components/user/Login.vue';
import Signup from './components/user/Signup.vue';
import BoardsList from './components/board/List.vue';

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
