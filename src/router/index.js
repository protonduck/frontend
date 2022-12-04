import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/:catchAll(.*)",
      name: 'Error404',
      component: () => import('../views/ErrorView.vue'),
    },
  ]
})

export default router
