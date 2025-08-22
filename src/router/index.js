import HomePage from '@/View/HomePage.vue'
import LayoutView from '@/View/LayoutView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import FileUpload from '@/View/FileUpload.vue'
import ButtonPage from '@/View/ButtonPage.vue'
// import Table from '@/View/table.vue'
import TextArea from '@/View/TextArea.vue'
import Parenttableexample from '@/View/parenttableexample.vue'
import Profile from '@/View/userprofile.vue'
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
      path: '/table',
      name: 'Table',
      component: Parenttableexample
    },
    {
      path: '/textarea',
      name: 'textarea',
      component: TextArea

    },
    {
      path: '/layout',
      name: 'Layout',
      component: LayoutView
    },
     {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },

  ],
})

export default router
