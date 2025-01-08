import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import LoginPage from '../views/LoginPage.vue'
import Videopage from '../views/Videopage.vue'

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
    },
    {
      path: '/video/:id',
      name: 'video',
      component: Videopage
    }
  ],
})

export default router
