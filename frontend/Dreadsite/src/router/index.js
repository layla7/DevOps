import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ],
})

export default router
