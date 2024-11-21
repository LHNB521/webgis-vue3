import { RouteRecordRaw } from 'vue-router'
const CesiunVue = () => import('@/views/cesium/index.vue')
const EmptyRouterView = () => import('@/views/routerViews/emptyRouterViews.vue')

// cesium路由
export const cesiumRoutes: any = [
  {
    path: '/cesium/eye',
    meta: { title: '鹰眼' },
    component: () => import('@/views/cesium/eye/index.vue'),
  },
  {
    path: '',
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
  {
    path: '',
    meta: { title: '卫星' },
    children: [
      {
        path: '/cesium/satellite/index',
        component: () => import('@/views/cesium/satellite/index.vue'),
        meta: {
          title: '卫星1',
        },
      },
    ],
  },
  {
    path: '',
    meta: { title: '颗粒' },
    children: [
      {
        path: '/cesium/particle/index',
        component: () => import('@/views/cesium/particle/index.vue'),
        meta: {
          title: '颗粒1',
        },
      },
    ],
  },
  {
    path: '',
    meta: { title: '打点' },
    children: [
      {
        path: '/cesium/ponit/entitiesAdd/index',
        component: () => import('@/views/cesium/ponit/entitiesAdd/index.vue'),
        meta: {
          title: '打点1',
        },
      },
    ],
  },
  {
    path: '',
    meta: { title: '模型' },
    children: [
      {
        path: '/cesium/model/index',
        component: () => import('@/views/cesium/model/index.vue'),
        meta: {
          title: '模型1',
        },
      },
    ],
  },
]

// openLayers路由
export const openLayersRoutes: any = [
  {
    path: '/openlayers/camera',
    component: EmptyRouterView,
    meta: { title: '相机' },
    children: [
      {
        path: '/openlayers/camera/fly',
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
    component: CesiunVue,
    children: cesiumRoutes,
  },
  {
    path: '/openlayers',
    component: () => import('@/views/openlayers/index.vue'),
    children: openLayersRoutes,
  },
]
