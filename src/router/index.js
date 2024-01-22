import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks.vue'
import Timer from '@/views/Timer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/timer',
      name: 'timer',
      component: Timer
    }
  ]
})

export default router
