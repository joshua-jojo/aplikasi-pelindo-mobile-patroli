import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'user.dashboard' }
  },
  {
    path: '/user',
    component: () => import('../layout/userLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'user.dashboard',
        component: () => import('../views/guest/berandaUser.vue')
      },
    ]
  },
  {
    path: '/take-photo',
    name: 'takePhoto',
    component: () => import('../views/guest/plugins/useCameraAPI.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
