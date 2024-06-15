import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')
const EmptyRouterView = () => import('@/views/routerViews/emptyRouterViews.vue')

// cesium路由
export const cesiumRoutes: any = [
  {
    path: '/cesium/camera',
    component: EmptyRouterView,
    meta: { title: '相机' },
    children: [
      {
        path: '/cesium/camera/fly',
        meta: {
          title: '飞行',
        },
        component: () => import('@/views/cesium/camera/fly.vue'),
      },
    ],
  },
]

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
