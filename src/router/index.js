import HomePage from '@/View/HomePage.vue'
import Table from '@/View/table.vue'
import TextArea from '@/View/TextArea.vue'
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
      path:'/table',
      name: 'table',
      component: Table
    },
     {
      path:'/textarea',
      name: 'textarea',
      component: TextArea

    }

  ],
})

export default router
