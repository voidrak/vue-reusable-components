import HomePage from '@/View/HomePage.vue'
import ButtonPage from '@/View/ButtonPage.vue'
import LayoutView from '@/View/LayoutView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import FileUpload from '@/View/FileUpload.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/buttons',
      name: 'Buttons',
      component: ButtonPage
    },
    {
      path: '/fileUpload',
      name: 'FileUpload',
      component: FileUpload
    },
    {
      path: '/layout',
      name: 'Layout',
      component: LayoutView
    },
  ],
})

export default router
