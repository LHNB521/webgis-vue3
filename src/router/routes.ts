import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
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
  {
    path: '/openlayers',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/openlayers/index.vue'),
      },
    ],
  },
]

// cesium路由
export const cesiumRoutes: any = [
  {
    path: '/camera',
    component: Layout,
    meta: { title: '相机' },
    children: [
      {
        path: '/camera/fly',
        meta: {
          title: '飞行',
        },
        component: () => import('@/views/cesium/camera/fly.vue'),
      },
    ],
  },
]
