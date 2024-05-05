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
      path: '/command',
      name: 'command',
      component: () => import('../views/command/CommandView.vue')
    },
    {
      path: '/flyweight',
      name: 'flyweight',
      component: () => import('../views/flyweight/FlyweightView.vue')
    },
    {
      path: '/heictopng',
      name: 'heictopng',
      component: () => import('../views/heictopng/HeicToPngView.vue')
    },
    {
      path: '/pension',
      name: 'pension',
      component: () => import('../views/pension/PensionView.vue')
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('../views/grid/GridView.vue')
    },
  ]
})

export default router
