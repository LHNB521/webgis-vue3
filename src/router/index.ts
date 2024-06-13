import { Router, createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})
export default router
