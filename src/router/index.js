import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks.vue'
import Timer from '@/views/Timer.vue'
import Achievements from '@/views/Achievements.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/tasks/:taskId/timer',
      name: 'timer',
      component: Timer
    },{
      path: '/achievements',
      name: 'achievements',
      component: Achievements
    },
  ]
})

export default router
