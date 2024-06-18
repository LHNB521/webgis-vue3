import { RouteRecordRaw } from 'vue-router'
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
        component: () => import('@/views/cesium/camera/fly.vue'),
        meta: {
          title: '飞行',
        },
      },
    ],
  },
]

export const routes: RouteRecordRaw[] = [
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
    component: () => import('@/views/cesium/index.vue'),
    children: cesiumRoutes,
  },
  {
    path: '/openlayers',
    component: () => import('@/views/openlayers/index.vue'),
    children: [],
  },
]
