import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/cesium',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/cesium/index.vue'),
      },
    ],
  },
]
