import HomePage from '@/View/HomePage.vue'
import LayoutView from '@/View/LayoutView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/layout',
      name: 'Layout',
      component: LayoutView
    },
  ],
})

export default router
